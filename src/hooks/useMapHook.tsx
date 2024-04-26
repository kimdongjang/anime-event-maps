import { useCallback, useEffect, useState } from 'react';
import type { Coordinates, NaverMap } from '../types/map';
import useSWR, { mutate } from 'swr';
import { IEvent } from '@/services/event/@types';
import { useRecoilState } from 'recoil';
import { markerStore, eventListStore, curPositionStore } from '@/stores/MapDataStore';
import { IMarker } from '@/constants/common';
import { Image } from 'antd';
import { useMapEvents } from 'react-leaflet';

export const INITIAL_CENTER: Coordinates = {
  lat: 37.2663759,
  lng: 126.99711,
};
export const INITIAL_ZOOM = 11;

export const MAP_KEY = '/map';


const useMapHook = () => {
  /** useSWR의 MAP_KEY로 API를 지정 */
  const { data: naverMap }: { data: NaverMap | undefined } = useSWR(MAP_KEY);
  const [eventList, setEventList] = useRecoilState(eventListStore);
  const [markerList, setMarkerList] = useState<IMarker[]>();
  // const [curPosition, setCurPosition] = useState<Coordinates>(INITIAL_CENTER);

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

  useEffect(() => {
    if (!!naverMap && !!eventList) {
      const markerList: IMarker[] = [];
      // eventList.map((data, i) => {
      //   // 선택된 리스트를 지도에 마커로 표시
      //   renderMarker(data);
      //   const { marker, infoWindow } = renderMarker(data);
      //   markerList.push({
      //     checked: true,
      //     event: data,
      //     marker: marker,
      //     infoWindow: infoWindow,
      //   });
      // });
      setMarkerList(markerList);
    }
  }, [naverMap]);

  const openInfoWindow = (event: IEvent) => {
    if (!!naverMap) {
      const find = markerList?.find((data) => data.event.id === event.id);
      find?.infoWindow.open(naverMap, find.marker);
    }
  };


  return {
    initializeMap,
    resetMapOptions,
    openInfoWindow,
  };
};
export default useMapHook;
