import { useCallback, useEffect } from 'react';
import type { Coordinates, NaverMap } from '../types/map';
import useSWR, { mutate } from 'swr';
import { IEvent } from '@/services/event/@types';
import { useRecoilState } from 'recoil';
import { markerStore } from '@/stores/MarkerStore';

export const INITIAL_CENTER: Coordinates = {
  lat: 37.4862618,
  lng: 127.1222903,
};
export const INITIAL_ZOOM = 11;

export const MAP_KEY = '/map';

const useMapHook = () => {
  /** useSWR의 MAP_KEY로 API를 지정 */
  const { data: naverMap }: { data: NaverMap | undefined } = useSWR(MAP_KEY);
  const [markerList, setMarkerList] = useRecoilState(markerStore);

  const initializeMap = useCallback((map: NaverMap) => {
    /** mutate로 MAP_KEY를 호출하는 것으로 naver map 인스턴스를 가져올 수 있다고함 */
    mutate(MAP_KEY, map);
  }, []);

  const resetMapOptions = useCallback(() => {
    if (!!naverMap) {
      naverMap.morph(
        new naver.maps.LatLng(INITIAL_CENTER.lat, INITIAL_CENTER.lng),
        INITIAL_ZOOM
      );
    }
  }, [naverMap]);


  const renderMarker = (event: IEvent) => {
    if (!!naverMap) {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(event.lat, event.lng),
        map: naverMap,
      });
      const infoWindow = new naver.maps.InfoWindow({
        content: [
          `<div class="p-3">
                    <h3>${event.title}</h3>
                    <p>${event.adress}</p>
                    <p>${event.startDate}</p>
                    <p>${event.endDate}</p>
                </div>`,
        ].join(''),
      });
      naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          !!naverMap && infoWindow.open(naverMap, marker);
        }
      });
    }
  };

  useEffect(() => {
    if (!!markerList) {
      markerList.map((data, i) => {
        // 선택된 리스트를 지도에 마커로 표시
        if (data.checked) {
          renderMarker(data.event);
        }
      });
    }
  }, [naverMap]);


  const morphMarker = (event: IEvent) => {
    if (!!naverMap) {
      naverMap.morph(new naver.maps.LatLng(event.lat, event.lng), 16);
    }
  };

  return {
    initializeMap,
    resetMapOptions,
    renderMarker,
    morphMarker,
  };
};
export default useMapHook;