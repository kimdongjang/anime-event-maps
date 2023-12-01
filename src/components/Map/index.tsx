import { Coordinates, NaverMap } from "@/types/map";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";


export const INITIAL_CENTER: Coordinates = [37.4862618, 127.1222903];
export const INITIAL_ZOOM = 11;

type Props = {
    mapId?: string;
    initialCenter?: Coordinates;
    initialZoom?: number;
};

export const Map = ({
    mapId = 'map',
    initialCenter = INITIAL_CENTER,
    initialZoom = INITIAL_ZOOM,
}: Props) => {
    const mapRef = useRef<NaverMap | null>(null);
    const [map, setMap] = useState<NaverMap>();

    const addMarker = () => {
        new naver.maps.Marker({
            position: new naver.maps.LatLng(37.3595704, 127.105399),
            map: map
        });
    }

    const initializeMap = () => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(...initialCenter),
            zoom: initialZoom,
            minZoom: 8,
            scaleControl: false,
            mapDataControl: false,
            logoControlOptions: {
                position: naver.maps.Position.BOTTOM_LEFT,
            },
        };
        //새로운 네이버 맵 인스턴스 생성 
        const map = new window.naver.maps.Map(mapId, mapOptions);
        setMap(map);

        mapRef.current = map;
    };

    useEffect(() => {
        if (!!map) {
            addMarker()
        }

    }, [map])

    //맵이 unmount되었을 때 맵 인스턴스 destory하기 
    useEffect(() => {
        if (!!window) {
            initializeMap();
        }
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

            />
            <div id={mapId} style={{ width: '100%', height: '100%' }} />
        </>
    )
}