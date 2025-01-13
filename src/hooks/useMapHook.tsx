import { useCallback, useEffect, useState } from 'react';
import type { Coordinates } from '../types/map';
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

const useMapHook = () => {
  /** useSWR의 MAP_KEY로 API를 지정 */
  const [eventList, setEventList] = useRecoilState(eventListStore);
  const [markerList, setMarkerList] = useState<IMarker[]>();
  // const [curPosition, setCurPosition] = useState<Coordinates>(INITIAL_CENTER);



  return {
   
  };
};
export default useMapHook;
