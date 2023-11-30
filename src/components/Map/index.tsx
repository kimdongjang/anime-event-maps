import { NaverMap } from "@/types/map";
import { Coordinates } from "@/types/store";
import Script from "next/script";
import { useEffect, useRef } from "react";


export const INITIAL_CENTER: Coordinates = [37.4862618, 127.1222903];
export const INITIAL_ZOOM = 10;

type Props = {
    mapId?: string;
    initialCenter?: Coordinates;
    initialZoom?: number;
    onLoad?: (map: NaverMap) => void;
};

export const Map = ({
    mapId = 'map',
    initialCenter = INITIAL_CENTER,
    initialZoom = INITIAL_ZOOM,
    onLoad,
}: Props) => {
    const mapRef = useRef<NaverMap | null>(null);

    const initializeMap = () => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(...initialCenter),
            zoom: initialZoom,
            minZoom: 9,
            scaleControl: false,
            mapDataControl: false,
            logoControlOptions: {
                position: naver.maps.Position.BOTTOM_LEFT,
            },
        };
        //새로운 네이버 맵 인스턴스 생성 
        const map = new window.naver.maps.Map(mapId, mapOptions);
        mapRef.current = map;

        if (onLoad) {
            onLoad(map);
        }
    };

    //맵이 unmount되었을 때 맵 인스턴스 destory하기 
    useEffect(() => {
        return () => {
            mapRef.current?.destroy();
        };
    }, []);

    return (
        <>
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
                onReady={initializeMap}
            />
            <div id={mapId} style={{ width: '100%', height: '100%' }} />
        </>
    )
}