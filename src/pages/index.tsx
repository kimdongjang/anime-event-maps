import { Inter } from 'next/font/google';
import { Map } from '@/components/Map';
import RootLayout from '@/layout/RootLayout';
import Sidebar from '@/components/Sidebar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { markerStore, searchListStore } from '@/stores/MapDataStore';
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

const inter = Inter({ subsets: ['latin'] });

export default function Main(props: any) {
  const siteTitle = '애이맵(애니메이션 행사 맵스)';
  const { datas } = props;
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [isMobileShow, setIsMobileShow] = useRecoilState(mobileIsOpenStore);
  const [isDesktopShow, setIsDesktopShow] = useState(true);
  const [modalOpen, setModalOpen] = useState(true);
  const [monunted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const favoriteList: IEvent[] = getLocalstorageEvent();
    setSearchList(
      datas.map((event: IEvent) => {
        let find = favoriteList.find((str) => str.id === event.id);
        if (!!find) {
          let temp = { ...event };
          temp.isFavorite = true;
          return temp;
        } else return event;
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

  const renderModal = () => {
    if (monunted) {
      return (
        <Modal
          title="공지사항"
          centered
          open={modalOpen}
          onOk={() => {
            setLocalstorageNotice();
            setModalOpen(false);
          }}
          onCancel={() => {
            setLocalstorageNotice();
            setModalOpen(false);
          }}
          okButtonProps={{
            className: 'bg-blue-500',
            content: '확인',
          }}
        >
          <div className="flex flex-col">
            <p>
              애이맵(애니메이션 행사 맵스)은 애니메이션/게임 오프라인 행사
              정보들을 모아서 사용자에게 제공하는 사이트입니다.
            </p>
            <p>
              수동으로 데이터를 입력하는 것이기에 맞지 않는 정보가 있을 수도
              있습니다.
            </p>
            <h4 className="font-semibold pt-3">현재버전 v1.0.0</h4>
            <ul className="px-3">
              <li>행사 이벤트 위치 지도에서 보기 기능</li>
              <li>북마크 기능</li>
              <li>필터 기능 추가 완료</li>
            </ul>
            <h4 className="font-semibold pt-3">업데이트예정 v1.1.0</h4>
            <ul className="px-3">
              <li>내 위치 확인 기능</li>
              <li>상위 핀 기능</li>
              <li>행사별 트위터 컴포넌트 연결</li>
              <li>행사별 페이지 번호 생성 및 공유 기능</li>
            </ul>
            <p className="pt-3">
              건의사항은 자유롭게
              <a href="mailto:gieunp3644@gmail.com" className="ml-1">
                gieunp3644@gmail.com
              </a>
              혹은 트위터 @gieunp로 연락주시면 감사하겠습니다.
            </p>
          </div>
        </Modal>
      );
    }
  };

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
          className="bg-indigo-200 hover:bg-blue-200 h-full w-10"
          onClick={() => setIsDesktopShow(false)}
        >
          <ChevronRightIcon />
        </button>
      );
    } else {
      return (
        <button
          className="bg-indigo-200 hover:bg-blue-200 h-full w-10"
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
            router.push('?search');
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
