import { useCallback, useEffect, useState } from 'react';
import type { Coordinates, NaverMap } from '../types/map';
import useSWR, { mutate } from 'swr';
import { IEvent } from '@/services/event/@types';
import { useRecoilState } from 'recoil';
import { markerStore, searchListStore } from '@/stores/MapDataStore';
import { IMarker } from '@/constants/common';

export const INITIAL_CENTER: Coordinates = {
  lat: 37.2663759,
  lng: 126.99711,
};
export const INITIAL_ZOOM = 11;

export const MAP_KEY = '/map';

const useMapHook = () => {
  /** useSWR의 MAP_KEY로 API를 지정 */
  const { data: naverMap }: { data: NaverMap | undefined } = useSWR(MAP_KEY);
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [markerList, setMarkerList] = useState<IMarker[]>();

  // const [myLocation, setMyLocation] = useState<{
  //   latitude: number;
  //   longitude: number;
  // }>();

  // // get current position
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       setMyLocation({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //       });
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (!!myLocation) {
  //     const currentPosition = [myLocation.latitude, myLocation.longitude];

  //     const currentMarker = new naver.maps.Marker({
  //       map: naverMap,
  //       position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
  //     });
  //   }
  // }, [myLocation]);

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
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(event.lat, event.lng),
      map: naverMap,
    });
    const infoWindow = new naver.maps.InfoWindow({
      content: [
        `<div class="p-3 ">
              <img src="${event.images.path}" width="250" height="150" 
                alt="${event.images.alt}"/>
              <h3>${event.title}</h3>
              <p>${event.address}</p>
              <div class="flex">
                <label class="bg-yellow-100 border-gray-100 rounded text-sm font-medium px-1">기간</label>
                <p>${event.startDate}</p>
                <p>~</p>
                <p>${event.endDate}</p>
              </div>
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
    return {
      marker,
      infoWindow,
    };
  };

  useEffect(() => {
    if (!!naverMap && !!searchList) {
      const markerList: IMarker[] = [];
      searchList.map((data, i) => {
        // 선택된 리스트를 지도에 마커로 표시
        renderMarker(data);
        const { marker, infoWindow } = renderMarker(data);
        markerList.push({
          checked: true,
          event: data,
          marker: marker,
          infoWindow: infoWindow,
        });
      });
      setMarkerList(markerList);
    }
  }, [naverMap]);

  const openInfoWindow = (event: IEvent) => {
    if (!!naverMap) {
      const find = markerList?.find((data) => data.event.id === event.id);
      find?.infoWindow.open(naverMap, find.marker);
    }
  };

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
    openInfoWindow,
  };
};
export default useMapHook;
