import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMapHook';
import { markerStore } from '@/stores/MapDataStore';
import { Coordinates, NaverMap } from '@/types/map';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./DynamicMap'), {
  loading: () => <></>,
  ssr: false,
});

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
  const [naverMap, setNaverMap] = useState<NaverMap>();

  /**
   * 해당 컴포넌트가 마운트될 때마다 스크립트가 동작한다.
   *  네이버 API같은 경우에는 다른 페이지에 이동할때 언마운트되고,
   *  다시 돌아올 때 해당 컴포넌트가 마운트되니
   *  onReady props를 사용하는 것이 더욱 적합
   *  */
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(
        initialCenter.lat,
        initialCenter.lng
      ),
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
      {/* <Script
        strategy="afterInteractive"
        type="text/javascript"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NCP_CLIENT_ID}`}
        onReady={initializeMap}
      /> */}
      <DynamicMap />
    </>
  );
};

export default Map;
