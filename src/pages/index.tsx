import { Inter } from 'next/font/google';
import RootLayout from '@/layout/RootLayout';
import Sidebar from '@/components/Sidebar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { curPositionStore, eventListStore, selectedEventStore } from '@/stores/MapDataStore';
import { Badge, FloatButton, Modal } from 'antd';
import { MdSearch, MdMyLocation, MdRefresh } from 'react-icons/md';
import { BsFillMegaphoneFill } from 'react-icons/bs';
import { BottomSheet } from '@/components/BottomSheet';
import { useRouter } from 'next/router';
import useMapHook from '@/hooks/useMapHook';
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
import axios from 'axios';
import { useGetEventList, useGetEventListById } from '@/hooks/event/useEventApi';
import { parseEvent } from '@/utils/parse';
import KakaoMap from '@/components/Map';
import { GET_EVENT_LIST_BYID } from '@/constants/endpoint';

const inter = Inter({ subsets: ['latin'] });

export default function Main(props: any) {
    const router = useRouter();
    const { id } = router.query; // URL의 ?id 파라미터 값

    const siteTitle = '코이맵(코믹 행사 맵스)';
    const getEventApi = useGetEventList();
    const [eventList, setEventList] = useRecoilState(eventListStore);
    const [isMobileShow, setIsMobileShow] = useRecoilState(mobileIsOpenStore);
    const [isDesktopShow, setIsDesktopShow] = useState(true);

    const [modalOpen, setModalOpen] = useState(true);
    const [monunted, setMounted] = useState(false);


    const [curPosition, setCurPosition] = useRecoilState(curPositionStore); 
    const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventStore);  
    /**
     * 지도에서 보기를 클릭하거나, 해당 ID로 검색이 되었을때
     * 해당 마커를 활성화함
     */
    useEffect(() => {
        if (id) {
            const getEvent = async () => {
                const event = await axios.get(`${GET_EVENT_LIST_BYID}?id=${id}`);

                setCurPosition({...curPosition, lat: event.data.lat, lng: event.data.lng});
                setIsMobileShow(false);
                setSelectedEvent(event.data);
            }
            getEvent();
            console.log(`Query parameter "id" has changed: ${id}`);
        }
    }, [id]); // id가 변경될 때 실행


    useEffect(() => {
        if (getEventApi.isLoading || getEventApi.error) return;
        const favoriteList: IEvent[] = getLocalstorageEvent();

        // datas: static한 데이터
        // 모든 행사장 리스트 필터링 진행(시간 순서 별로)
        setEventList(
            getEventApi.response.content.map((event: IEvent) => {
                let find = favoriteList.find((str) => str.id === event.id);
                if (!!find) {
                    let temp = { ...event };
                    temp.isFavorite = true;
                    return parseEvent(temp);
                } else return parseEvent(event);
            }).sort((a: IEvent, b: IEvent) => {
                // 문자열로 된 날짜를 Date 객체로 변환하여 비교
                const dateA: Date = new Date(a.startDate);
                const dateB: Date = new Date(b.startDate);

                return dateA.getTime() - dateB.getTime();
            })
        );

    }, [getEventApi.error, getEventApi.isLoading])

    /** 
     * 메인 페이지 초기 로딩시 초기화 진행
     */
    useEffect(() => {
        // const favoriteList: IEvent[] = getLocalstorageEvent();

        // if(!getEventApi?.data) return;
        // console.log(getEventApi)
        // // datas: static한 데이터
        // // 모든 행사장 리스트 초기화 진행(시간 순서 별로)
        // setEventList(
        //   getEventApi?.data.map((event: IEvent) => {
        //     let find = favoriteList.find((str) => str.id === event.id);
        //     if (!!find) {
        //       let temp = { ...event };
        //       temp.isFavorite = true;
        //       return temp;
        //     } else return event;
        //   }).sort((a: IEvent,b: IEvent) => {
        //     // 문자열로 된 날짜를 Date 객체로 변환하여 비교
        //     const dateA: Date = new Date(a.startDate);
        //     const dateB: Date = new Date(b.startDate);

        //     return dateA.getTime() - dateB.getTime();
        //   })
        // );

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
            return <ModalNotice modalOpen={modalOpen} setModalOpen={setModalOpen} />;
        }
    };
    const renderBtn = () => {
        return (
          <button
            className="fixed z-[1] top-1/2 right-2 transform -translate-y-1/2 
                       bg-indigo-50 hover:bg-blue-100 text-gray-800 
                       w-12 h-12 rounded-full shadow-md border 
                       flex items-center justify-center transition-transform duration-200"
            onClick={() => setIsDesktopShow(!isDesktopShow)}
          >
            {isDesktopShow ? <ChevronRightIcon /> : <ChevronLeftIcon  />}
          </button>
        );
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
                    <KakaoMap />
                    {/* <div className="bg-gray-100 w-full h-full"></div> */}
                </div>
            </section>

            <div className="relative hidden md:block">{renderBtn()}</div>
            <Sidebar
                className="hidden md:block z-[5]"
                handleShow={handleShow}
                isShow={isDesktopShow}
            />
            <div className="fixed bottom-[3%] left-[3%] flex flex-col z-[5]">
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
            <div className="md:hidden fixed bottom-[3%] right-[3%] flex flex-col z-[5]">
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

// export async function getStaticProps() {
//   const datas = (await import('../../public/data/sample.json')).default;
//   return {
//     props: { datas },
//     revalidate: 60 * 60,
//   };
// }

// export async function getServerSideProps() {
//   const datas = await axios.get('/api/event/getEventList');
//   return {
//     props: { datas },
//     revalidate: 60 * 60,
//   }
// }
