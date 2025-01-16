import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMapHook';
import { eventListStore, searchedListStore, selectCategoryStore } from '@/stores/MapDataStore';
import { Coordinates } from '@/types/map';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import dynamic from 'next/dynamic';
import { Map, MapComponent, MapMarker } from 'react-kakao-maps-sdk';
import { IEvent } from '@/services/event/@types';
import { MainCategory } from '@/constants/enums';
import LocationMarkers from './LocationMarkers';
import { Swiper } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';


declare global {
    interface Window {
        kakao: any;
    }
}

type Props = {
    mapId?: string;
    initialCenter?: Coordinates;
    initialZoom?: number;
};

const KakaoMap = ({
    mapId = 'map',
    initialCenter = INITIAL_CENTER,
    initialZoom = INITIAL_ZOOM,
}: Props) => {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_NCP_CLIENT_ID;
    const [scriptLoad, setScriptLoad] = useState<boolean>(false);

    const [eventList, setEventList] = useRecoilState(eventListStore);
    const [searchedEventList, setSearchedEventList] = useRecoilState(searchedListStore);
    const [selectCategory, setSelectCategory] = useRecoilState(selectCategoryStore);

    console.log(eventList)

    useEffect(() => {
        const script: HTMLScriptElement = document.createElement("script");
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false`;
        document.head.appendChild(script);

        script.addEventListener("load", () => {
            setScriptLoad(true);
        })
    }, [])
    /**
     * 렌더링 하는 마커는 같은 행사장에 여러 행사가 있을 수 있기 때문에
     * 행사장별로 묶어서 렌더링한다
     * @returns 
     */
    const renderList = () => {
        // 필터에 체크된 이벤트 리스트 혹은 전체 이벤트 리스트
        let list = searchedEventList.searchedList.length !== 0 ? searchedEventList.searchedList : eventList

        // 거기에 추가로 이벤트 행사장별 리스트를 생성함
        const eventHallFilter = [...new Set(list.map((data) => data.eventHall))];

        // 행사장 별로 묶어서 리스트를 초기화
        const eventHallList = eventHallFilter.map(hall => {
            let temps: IEvent[] = [];
            // 필터링된 이벤트 리스트를 이벤트 행사장별로 묶음
            list.map(event => {
                if (hall === event.eventHall)
                    temps.push(event)
            });
            return temps;
        })

        switch (selectCategory) {
            case MainCategory.MAIN:
                return eventHallList.map((events, i) => {
                    //   return <LocationMarkers events={events} key={i}/>
                });
            //   case MainCategory.FAVORITE:
            //     return eventHallList.map((events) => 
            //        events.filter((filter) => filter.isFavorite === true)
            //     ).map((events, i) => <LocationMarkers events={events} key={i}/>);
            default:
                return <></>;
        }
    }

    const swiperRef = useRef<SwiperType>();


    return (
        <>
            {scriptLoad ?
                <Map
                    center={{ lat: 37.5665, lng: 127.100 }}
                    style={{ width: "100%", height: "800px" }}
                    level={9}
                    onCreate={(map) => {
                        console.log("생성됨")
                        map.setCenter(new kakao.maps.LatLng(37.5665, 127.100))
                    }}
                >
                    {
                        eventList.map((event, i) => {
                            return <MapMarker key={i} position={{ lat: event.lat, lng: event.lng }} >

                                <Swiper
                                    pagination={{
                                        type: 'fraction',
                                    }}
                                    navigation={false}
                                    modules={[Pagination, Navigation]}
                                    className="mySwiper "
                                    onBeforeInit={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                >
                                    {/* {event.map((event, i) => {
                        // 종료된 이벤트가 체크되어 있다면 전체 출력
                        if (searchEventList.isEnd) {
                            return (
                                <SwiperSlide className='p-3 pb-10 ' key={i}>
                                    <Image src={event.images?.path} />
                                    <h3>{event.title}</h3>
                                    <div className='m-0'>{event.address}</div>
                                    <div className='flex items-center'>
                                        <span className="bg-yellow-100 border-gray-100 rounded text-sm font-medium px-1">기간</span>
                                        <span>{event.startDate}~{event.endDate}</span>
                                    </div>
                                </SwiperSlide>
                            )
                        } else {
                            // 종료 날짜를 비교해서 예정된 이벤트만 출력
                            if (checkEndEvent(new Date(event.endDate))) {
                                return (
                                    <SwiperSlide className='p-3 pb-10 ' key={i}>
                                        <Image src={event.images?.path} />
                                        <h3>{event.title}</h3>
                                        <div className='m-0'>{event.address}</div>
                                        <div className='flex items-center'>
                                            <span className="bg-yellow-100 border-gray-100 rounded text-sm font-medium px-1">기간</span>
                                            <span>{event.startDate}~{event.endDate}</span>
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                        }
                    })} */}
                                </Swiper>
                                <div>
                                    <button onClick={() => swiperRef.current?.slidePrev()} className='fixed bottom-[5%] left-[35%] z-[1]'><AiFillCaretLeft className='text-blue-500' size={30} /></button>
                                    <button onClick={() => swiperRef.current?.slideNext()} className='fixed bottom-[5%] right-[35%] z-[1]'><AiFillCaretRight className='text-blue-500' size={30} /></button>
                                </div>
                            </MapMarker>
                        })
                    }
                </Map>
                :
                <div></div>
            }
        </>
    );
};

export default KakaoMap;
