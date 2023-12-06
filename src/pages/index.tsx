import { Inter } from 'next/font/google';
import { Map } from '@/components/Map';
import RootLayout from '@/layout/RootLayout';
import Sidebar from '@/components/Sidebar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useEffect, useRef, useState } from 'react';
import { sampleEvents } from '@/constants/sample';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { markerStore } from '@/stores/MapDataStore';
import { IMarker } from '@/constants/common';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Badge, FloatButton } from 'antd';
import { MdHome, MdMyLocation, MdRefresh } from 'react-icons/md';
import { BottomSheet } from '@/components/BottomSheet';
import { useRouter } from 'next/router';
import useMapHook from '@/hooks/useMapHook';
import { NaverMap } from '@/types/map';
import { MainCategory } from '@/constants/enums';
import { mobileIsOpenStore } from '@/stores/MobileStore';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const [isMobileShow, setIsMobileShow] = useRecoilState(mobileIsOpenStore);
  const [isDesktopShow, setIsDesktopShow] = useState(true);
  const router = useRouter();

  useEffect(() => {
    window.onpopstate = () => {
      // 뒤로가기가 실행될 경우 추가 action 등록
      if (!!isMobileShow) {
        setIsMobileShow(false);
      }
    };
  }, [isMobileShow]);

  const { initializeMap } = useMapHook();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
  };

  const renderBtn = () => {
    if (isDesktopShow) {
      return (
        <button
          className="rounded bg-blue-300 hover:bg-blue-200  h-full w-10"
          onClick={() => setIsDesktopShow(false)}
        >
          <ChevronRightIcon />
        </button>
      );
    } else {
      return (
        <button
          className="rounded bg-blue-300 hover:bg-blue-200  h-full w-10"
          onClick={() => setIsDesktopShow(true)}
        >
          <ChevronLeftIcon />
        </button>
      );
    }
  };

  const handleShow = (isShow: boolean) => {
    setIsDesktopShow(isShow);
  };

  return (
    <RootLayout>
      <section
        className={`w-[100%] h-screen flex flex-col items-center justify-between ${inter.className}`}
      >
        <div className="w-full h-full">
          {/* 맵 섹션 */}
          <Map onLoad={onLoadMap} />
          <div className="bg-gray-100 w-full h-full"></div>
        </div>
      </section>

      <div className="relative hidden md:block">{renderBtn()}</div>
      <Sidebar
        className="hidden md:block"
        handleShow={handleShow}
        isShow={isDesktopShow}
      />
      <div className="fixed bottom-[3%] left-[3%] flex flex-col ">
        <button
          className="border border-gray-400 bg-white rounded-full p-2 my-2"
          type="button"
        >
          <MdMyLocation size={28} />
        </button>
      </div>
      {/* <BottomNavigation className={'md:hidden'} /> */}
      {/* 모바일용 플롯 버튼 */}
      <div className="md:hidden fixed bottom-[3%] right-[3%] flex flex-col ">
        <button
          onClick={() => router.reload()}
          className="border border-gray-400 bg-white rounded-full p-2 my-2"
          type="button"
        >
          <MdRefresh size={36} />
        </button>

        <button
          onClick={() => {
            router.push('?search');
            setIsMobileShow(true);
          }}
          className="border border-gray-400 bg-white rounded-full p-2"
          type="button"
        >
          <Badge dot={true}>
            <MdHome size={36} />
          </Badge>
        </button>
      </div>

      <BottomSheet isOpen={isMobileShow} setOpen={setIsMobileShow} />
    </RootLayout>
  );
}
