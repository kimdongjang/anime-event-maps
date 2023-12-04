import { Inter } from 'next/font/google';
import { Map } from '@/components/Map';
import RootLayout from '@/layout/RootLayout';
import Sidebar from '@/components/Sidebar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useEffect, useRef, useState } from 'react';
import { sampleEvents } from '@/constants/sample';
import { useRecoilState } from 'recoil';
import { markerStore } from '@/stores/MarkerStore';
import { IMarker } from '@/constants/common';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Badge, FloatButton } from 'antd';
import { MdHome } from 'react-icons/md';
import { BottomSheet } from '@/components/BottomSheet';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const [markerList, setMarkerList] = useRecoilState(markerStore);
  const [isMobileShow, setIsMobileShow] = useState(false);
  const [isDesktopShow, setIsDesktopShow] = useState(true);

  const renderBtn = () => {
    if (isShow) {
      return (
        <button
          className="rounded bg-blue-300 hover:bg-blue-200  h-full w-10"
          onClick={() => setIsShow(false)}
        >
          <ChevronRightIcon />
        </button>
      );
    } else {
      return (
        <button
          className="rounded bg-blue-300 hover:bg-blue-200  h-full w-10"
          onClick={() => setIsShow(true)}
        >
          <ChevronLeftIcon />
        </button>
      );
    }
  };

  useEffect(() => {
    if (!!sampleEvents) {
      let tempList: IMarker[] = [...markerList];
      sampleEvents.map((data, i) => {
        if (!!data.lat && !!data.lng) {
          tempList.push({
            coordinates: {
              lat: data.lat,
              lng: data.lng,
            },
            checked: true,
            event: data,
          });
        }
      });
      setMarkerList([...tempList]);
    }
  }, []);

  const handleShow = (isShow: boolean) => {
    setIsDesktopShow(isShow);
  };

  return (
    <RootLayout>
      <section
        className={`w-[100%] h-screen flex flex-col items-center justify-between ${inter.className}`}
      >
        <div className="w-full h-full">
          <Map />
          {/* <div className="bg-gray-100 w-full h-full"></div> */}
        </div>
      </section>

      <div className="relative hidden md:block">{renderBtn()}</div>
      <Sidebar
        className="hidden md:block"
        handleShow={handleShow}
        isShow={isDesktopShow}
      />
      {/* <BottomNavigation className={'md:hidden'} /> */}
      {/* 플롯 버튼 */}
      <button
        onClick={() => setIsMobileShow(true)}
        className="md:hidden fixed bottom-[3%] right-[3%] border border-gray-400 bg-white rounded-full p-2"
      >
        <Badge dot={true}>
          <MdHome size={36} />
        </Badge>
      </button>
      <BottomSheet isOpen={isMobileShow} setOpen={setIsMobileShow} />
    </RootLayout>
  );
}
