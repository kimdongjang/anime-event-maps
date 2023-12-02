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
    const [markerList, setMarkerList] = useRecoilState(markerStore);
    const mapRef = useRef<NaverMap | null>(null);
    const mapInitRef = useRef<NodeJS.Timeout>()
    const [naverMap, setNaverMap] = useState<NaverMap>();

    const addMarker = (event: IEvent) => {
        const marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(event.lat, event.lng),
            map: naverMap
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
                !!naverMap && infoWindow.open(naverMap, marker)
            }
        })
    }
    const panToMarker = (event: IEvent) => {
        if (!!naverMap) {
            naverMap.panTo(new naver.maps.LatLng(event.lat, event.lng))
        }
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
        setNaverMap(map);

        mapRef.current = map;
    };

    useEffect(() => {
        if (!!naverMap && !!markerList) {
            markerList.map((data, i) => {
                // 선택된 리스트를 지도에 마커로 표시
                if (data.checked) {
                    addMarker(data.event)
                }
            })
        }
    }, [markerList, naverMap])

    /**
     * 네이버 맵 api가 온전히 로드가 되지 않아서 타이머로 초기화를 진행
     */
    useEffect(() => {
        if (!mapInitRef.current) {
            mapInitRef.current = setInterval(() => {
                if (!!window.naver) {
                    initializeMap();
                }
            }, 1000);
        }

        return () => {
            mapRef.current?.destroy();
        };
    }, []);

    useEffect(() => {
        if (!!naverMap) {
            clearInterval(mapInitRef.current);
        }
    }, [naverMap])

    return (
        <>
            <div id={mapId} style={{ width: '100%', height: '100%' }} />
        </>
    )
}