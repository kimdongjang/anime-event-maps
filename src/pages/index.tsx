import { Inter } from 'next/font/google';
import { Map } from '@/components/Map';
import RootLayout from '@/layout/RootLayout';
import Sidebar from '@/components/Sidebar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useState } from 'react';
import { IconButton } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const [isShow, setIsShow] = useState(true);
  const renderBtn = () => {
    if (isShow) {
      return (
        <IconButton
          className="rounded bg-blue-300 hover:bg-blue-200  h-full w-10"
          onClick={() => setIsShow(false)}
        >
          <ChevronRightIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          className="rounded bg-blue-300 hover:bg-blue-200  h-full w-10"
          onClick={() => setIsShow(true)}
        >
          <ChevronLeftIcon />
        </IconButton>
      );
    }
  };
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
