import { Inter } from 'next/font/google';
import { Map } from '@/components/Map';
import RootLayout from '@/layout/RootLayout';
import Sidebar from '@/components/Sidebar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { sampleEvents } from '@/constants/sample';
import { useRecoilState } from 'recoil';
import { markerStore } from '@/stores/MarkerStore';
import { IMarker } from '@/constants/common';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const [markerList, setMarkerList] = useRecoilState(markerStore);
  const [isShow, setIsShow] = useState(true);
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
          tempList.push(
            {
              coordinates: {
                lat: data.lat,
                lng: data.lng,
              },
              checked: true,
              event: data,
            }
          )
        }
      })
      setMarkerList([...tempList])
    }
  }, [])


  const handleShow = (isShow: boolean) => {
    setIsShow(isShow);
  };

  return (
    <RootLayout>
      <section
        className={`w-[100%] h-screen flex flex-col items-center justify-between ${inter.className}`}
      >
        <div className="w-full h-full">
          <Map />
        </div>
      </section>
      <div className="relative">{renderBtn()}</div>
      <Sidebar handleShow={handleShow} isShow={isShow} />
    </RootLayout>
  );
}
