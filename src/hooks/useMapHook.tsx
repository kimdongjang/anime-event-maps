import { useCallback, useEffect, useState } from 'react';
import type { Coordinates } from '../types/map';
import useSWR, { mutate } from 'swr';
import { IEvent } from '@/services/event/@types';
import { useRecoilState } from 'recoil';
import { eventListStore, selectedEventStore } from '@/stores/MapDataStore';
import { Image } from 'antd';

export const INITIAL_ZOOM = 11;

const useMapHook = () => {
  /** useSWR의 MAP_KEY로 API를 지정 */
  const [eventList, setEventList] = useRecoilState(eventListStore);
  // const [curPosition, setCurPosition] = useState<Coordinates>(INITIAL_CENTER);



  return {
   
  };
};
export default useMapHook;
