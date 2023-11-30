import { useCallback } from 'react';
import type { Coordinates } from '../types/store';
import type { NaverMap } from '../types/map';
import { useMutation } from 'react-query';

export const INITIAL_CENTER: Coordinates = [37.5262411, 126.99289439];
export const INITIAL_ZOOM = 10;

export const MAP_KEY = '/map';

const useMap = () => {
    // const { data: map } = useMutation(MAP_KEY);

    // const initializeMap = useCallback((map: NaverMap) => {
    //     mutate(MAP_KEY, map);
    // }, []);

    // const resetMapOptions = useCallback(() => {
    //     map.morph(new naver.maps.LatLng(...INITIAL_CENTER), INITIAL_ZOOM);
    // }, [map]);

    // const getMapOptions = useCallback(() => {
    //     const mapCenter = map.getCenter();
    //     const center: Coordinates = [mapCenter.lat(), mapCenter.lng()];
    //     const zoom = map.getZoom();

    //     return { center, zoom };
    // }, [map]);

    // return {
    //     initializeMap,
    //     resetMapOptions,
    //     getMapOptions,
    // };
};
export default useMap;