import { useCallback } from 'react';
import type { Coordinates, NaverMap } from '../types/map';
import useSWR, { mutate } from 'swr';

export const INITIAL_CENTER: Coordinates = {
  lat: 37.4862618,
  lng: 127.1222903,
};
export const INITIAL_ZOOM = 11;

export const MAP_KEY = '/map';

const useMapHook = () => {
  /** useSWR의 MAP_KEY로 API를 지정 */
  const { data: map } = useSWR(MAP_KEY);

  const initializeMap = useCallback((map: NaverMap) => {
    /** mutate로 MAP_KEY를 호출하는 것으로 naver map 인스턴스를 가져올 수 있다고함 */
    mutate(MAP_KEY, map);
  }, []);

  const resetMapOptions = useCallback(() => {
    map.morph(
      new naver.maps.LatLng(INITIAL_CENTER.lat, INITIAL_CENTER.lng),
      INITIAL_ZOOM
    );
  }, [map]);

  const getMapOptions = useCallback(() => {
    const mapCenter = map.getCenter();
    const center = [mapCenter.lat(), mapCenter.lng()];
    const zoom = map.getZoom();

    return { center, zoom };
  }, [map]);

  return {
    initializeMap,
    resetMapOptions,
    getMapOptions,
  };
};
export default useMapHook;
