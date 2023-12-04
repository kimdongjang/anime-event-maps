import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMap';
import { IEvent } from '@/services/event/@types';
import { markerStore } from '@/stores/MarkerStore';
import { Coordinates, NaverMap } from '@/types/map';
import Image from 'next/image';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

import styles from './Map.module.scss';

type Props = {
  mapId?: string;
  initialCenter?: Coordinates;
  initialZoom?: number;
  /** 네이버 맵이 초기화가 된 후 실행될 함수 */
  onLoad?: (map: NaverMap) => void;
};

export const Map = ({
  mapId = 'map',
  initialCenter = INITIAL_CENTER,
  initialZoom = INITIAL_ZOOM,
  onLoad,
}: Props) => {
  const [markerList, setMarkerList] = useRecoilState(markerStore);
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

  const addMarker = (event: IEvent) => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(event.lat, event.lng),
      map: naverMap,
    });
    const infoWindow = new naver.maps.InfoWindow({
      content: [
        `<div class="p-3">
                    <h3>${event.title}</h3>
                    <p>${event.adress}</p>
                    <p>${event.startDate}</p>
                    <p>${event.endDate}</p>
                </div>`,
      ].join(''),
    });
    naver.maps.Event.addListener(marker, 'click', () => {
      if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        !!naverMap && infoWindow.open(naverMap, marker);
      }
    });
  };
  const morphMarker = (event: IEvent) => {
    if (!!naverMap) {
      naverMap.morph(new naver.maps.LatLng(event.lat, event.lng));
    }
  };

  useEffect(() => {
    if (!!naverMap && !!markerList) {
      markerList.map((data, i) => {
        // 선택된 리스트를 지도에 마커로 표시
        if (data.checked) {
          addMarker(data.event);
        }
      });
    }
  }, [markerList, naverMap]);

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
  );
};
