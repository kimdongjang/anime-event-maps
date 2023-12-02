import { IEvent } from "@/services/event/@types";
import { markerStore } from "@/stores/MarkerStore";
import { Coordinates, NaverMap } from "@/types/map";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";


export const INITIAL_CENTER: Coordinates = { lat: 37.4862618, lng: 127.1222903 };
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
    const [markers, setMarkers] = useRecoilState(markerStore);
    const mapRef = useRef<NaverMap | null>(null);
    const [map, setMap] = useState<NaverMap>();

    const addMarker = (event: IEvent) => {
        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(event.lat as number, event.lng as number),
            map: map
        });
        const infoWindow = new naver.maps.InfoWindow({
            content: [
                `<div>
                    <h3>${event.title}</h3>
                    <p>${event.adress}</p>
                </div>`
            ].join('')
        })
        naver.maps.Event.addListener(marker, "click", () => {
            if (infoWindow.getMap()) {
                infoWindow.close();
            } else {
                !!map && infoWindow.open(map, marker)
            }
        })
    }

    const initializeMap = () => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(initialCenter.lat, initialCenter.lng),
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
        if (!!map && !!markers.markerList) {
            markers.markerList.map((data, i) => {
                if (data.checked) {
                    addMarker(data.event)
                }
            })
        }
    }, [markers, map])

    // useEffect(() => {
    //     if (!!map) {
    //         addMarker()
    //     }

    // }, [map])

    //맵이 unmount되었을 때 맵 인스턴스 destory하기 
    useEffect(() => {
        if (!!window.naver) {
            initializeMap();
        }
        return () => {
            mapRef.current?.destroy();
        };
    }, []);

    return (
        <>
            <div id={mapId} style={{ width: '100%', height: '100%' }} />
        </>
    )
}