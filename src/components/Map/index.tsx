import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMapHook';
import { markerStore } from '@/stores/MapDataStore';
import { Coordinates, NaverMap } from '@/types/map';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import dynamic from 'next/dynamic';


// const DynamicMap = dynamic(() => import('./DynamicMap'), {
//   loading: () => <></>,
//   ssr: false,
// });
declare global {
    interface Window {
        kakao: any;
    }
}

type Props = {
    mapId?: string;
    initialCenter?: Coordinates;
    initialZoom?: number;
    /** 네이버 맵이 초기화가 된 후 실행될 함수 */
    onLoad?: (map: NaverMap) => void;
};

const Map = ({
    mapId = 'map',
    initialCenter = INITIAL_CENTER,
    initialZoom = INITIAL_ZOOM,
    onLoad,
}: Props) => {
    const mapRef = useRef<NaverMap | null>(null);
    const [naverMap, setKakaoMap] = useState<NaverMap>();

    /**
     * 해당 컴포넌트가 마운트될 때마다 스크립트가 동작한다.
     *  네이버 API같은 경우에는 다른 페이지에 이동할때 언마운트되고,
     *  다시 돌아올 때 해당 컴포넌트가 마운트되니
     *  onReady props를 사용하는 것이 더욱 적합
  //    *  */
    const initializeMap = () => {
        // Kakao Maps API가 로드되었는지 확인
        if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
            // 지도 생성
            const mapContainer = document.getElementById('map') as HTMLElement;
            const mapOptions = {
                center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울
                level: 3, // 지도 확대 수준
            };
            const map = new window.kakao.maps.Map(mapContainer, mapOptions);
            console.log(map)

            // 마커 추가
            const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.978);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition
            });
            marker.setMap(map);
        }
    };
    useEffect(() => {
        //맵이 unmount되었을 때 맵 인스턴스 destory하기
        return () => {
            mapRef.current?.destroy();
        };
    }, []);


    return (
        <>
            <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
                onReady={initializeMap}
            />
            <div id={mapId} style={{ width: '100%', height: '100%' }} />
        </>
    );
};

export default Map;
