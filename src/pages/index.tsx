import { Inter } from 'next/font/google';
import RootLayout from '@/layout/RootLayout';
import Sidebar from '@/components/Sidebar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { markerStore, eventListStore } from '@/stores/MapDataStore';
import { Badge, FloatButton, Modal } from 'antd';
import { MdSearch, MdMyLocation, MdRefresh } from 'react-icons/md';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import { BottomSheet } from '@/components/BottomSheet';
import { useRouter } from 'next/router';
import useMapHook from '@/hooks/useMapHook';
import { NaverMap } from '@/types/map';
import { mobileIsOpenStore } from '@/stores/MobileStore';
import Head from 'next/head';
import {
  getLocalstorageEvent,
  getLocalstorageNotice,
  setLocalstorageNotice,
} from '@/utils/localStorages';
import { IEvent } from '@/services/event/@types';
import { ModalNotice } from '@/components/ModalNotice';
import { useSearchParams } from 'next/navigation';
import Map from '@/components/Map';

const inter = Inter({ subsets: ['latin'] });

export default function Main(props: any) {
  const siteTitle = '애이맵(애니메이션 행사 맵스)';
  const { datas } = props;
  const [eventList, setEventList] = useRecoilState(eventListStore);
  const [isMobileShow, setIsMobileShow] = useRecoilState(mobileIsOpenStore);
  const [isDesktopShow, setIsDesktopShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);
  const [monunted, setMounted] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { openInfoWindow } = useMapHook();

  const testRef = useRef(false);

  /** 
   * 메인 페이지 초기 로딩시 초기화 진행
   */
  useEffect(() => {
    const favoriteList: IEvent[] = getLocalstorageEvent();
    
    // datas: static한 데이터
    // 모든 행사장 리스트 초기화 진행(시간 순서 별로)
    setEventList(
      datas.map((event: IEvent) => {
        let find = favoriteList.find((str) => str.id === event.id);
        if (!!find) {
          let temp = { ...event };
          temp.isFavorite = true;
          return temp;
        } else return event;
      }).sort((a: IEvent,b: IEvent) => {
        // 문자열로 된 날짜를 Date 객체로 변환하여 비교
        const dateA: Date = new Date(a.startDate);
        const dateB: Date = new Date(b.startDate);
  
        return dateA.getTime() - dateB.getTime();
      })
    );
    setMounted(true);

    let notice = getLocalstorageNotice();
    if (!!notice) {
      // 만료시간이 지났을 경우 모달 오픈
      if (Date.now() > notice.expire) {
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }
    }
  }, []);

  /**
   * 파라미터 쿼리에 따라 해당 아이디 이벤트로 지도를 이동, 마커 팝업을 띄움
   */
  useEffect(() => {
    const paramId = params.get('id');
    if (!!paramId && !!eventList) {
      const findEvent = eventList.find(
        (event: IEvent) => event.id.toString() == paramId
      );
      if (!!findEvent) {
        // 화면이 깨지는 이슈가 있어서 2초후에 적용
        setTimeout(() => {
          // morphMarker(findEvent);          
        }, 1000);
        setTimeout(() => {
          openInfoWindow(findEvent)      
        }, 2500);

        // 모바일인 경우 편의성을 위해 창을 내려줌
        setIsMobileShow(false);
      }
    }
  }, [params, eventList]);

  const renderModal = () => {
    if (monunted) {
      return <ModalNotice modalOpen={modalOpen} setModalOpen={setModalOpen} />;
    }
  };
  useEffect(() => {
    testRef.current = isMobileShow;
  },[isMobileShow])

  
  useEffect(() => {
    const handleBeforeunload = (event: BeforeUnloadEvent) => {
      // 데스크탑인경우: 아무 처리도 하지 않음
      if(!testRef.current){
        return;
      }
      else{
        // 모바일인경우: 검색창 내리기
        setIsMobileShow(false);
        event.preventDefault();
      }
    };

    window.addEventListener('beforeunload', handleBeforeunload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeunload);
    };
  }, [router]);

  const { initializeMap } = useMapHook();
  const onLoadMap = (map: NaverMap) => {
    initializeMap(map);
  };

  const renderBtn = () => {
    if (isDesktopShow) {
      return (
        <button
          className="bg-indigo-50 hover:bg-blue-100 h-full w-10 border"
          onClick={() => setIsDesktopShow(false)}
        >
          <ChevronRightIcon />
        </button>
      );
    } else {
      return (
        <button
          className="bg-indigo-50 hover:bg-blue-100 h-full w-10 border"
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
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {renderModal()}
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
        className="hidden md:block z-[5]"
        handleShow={handleShow}
        isShow={isDesktopShow}
      />
      <div className="fixed bottom-[3%] left-[3%] flex flex-col ">
        <button
          className="border border-gray-400 bg-white rounded-full p-2 my-2"
          type="button"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <Badge dot={true}>
            <BsFillMegaphoneFill size={24} />
          </Badge>
        </button>
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
            // router.push('?search=mobile');
            setIsMobileShow(true);
          }}
          className="border border-gray-400 bg-white rounded-full p-2"
          type="button"
        >
          <Badge dot={true}>
            <MdSearch size={36} />
          </Badge>
        </button>
      </div>

      <BottomSheet isOpen={isMobileShow} setOpen={setIsMobileShow} />
    </RootLayout>
  );
}

export async function getStaticProps() {
  const datas = (await import('../../public/data/sample.json')).default;
  return {
    props: { datas },
    revalidate: 60 * 60,
  };
}
