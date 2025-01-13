import { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMapHook';
import { eventListStore, markerStore, searchListStore, selectCategoryStore } from '@/stores/MapDataStore';
import { Coordinates } from '@/types/map';
import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import dynamic from 'next/dynamic';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { IEvent } from '@/services/event/@types';
import { MainCategory } from '@/constants/enums';
import LocationMarkers from './LocationMarkers';
import { Swiper } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';


// const DynamicMap = dynamic(() => import('./DynamicMap'), {
//   loading: () => <></>,
//   ssr: false,
// });
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
    const [eventList, setEventList] = useRecoilState(eventListStore);
    const [searchEventList, setSearchEventList] = useRecoilState(searchListStore);
    const [selectCategory, setSelectCategory] = useRecoilState(selectCategoryStore);

    console.log(eventList)


    /**
     * 렌더링 하는 마커는 같은 행사장에 여러 행사가 있을 수 있기 때문에
     * 행사장별로 묶어서 렌더링한다
     * @returns 
     */
    const renderList = () => {
        // 필터에 체크된 이벤트 리스트 혹은 전체 이벤트 리스트
        let list = searchEventList.searchedList.length !== 0 ? searchEventList.searchedList : eventList

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

    // const initializeMap = () => {
    //     // Kakao Maps API가 로드되었는지 확인
    //     if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
    //         // 지도 생성
    //         const mapContainer = document.getElementById('map') as HTMLElement;
    //         const mapOptions = {
    //             center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울
    //             level: 3, // 지도 확대 수준
    //         };
    //         const map = new window.kakao.maps.Map(mapContainer, mapOptions);
    //         console.log(map)

    //         // 마커 추가
    //         const markerPosition = new window.kakao.maps.LatLng(37.5665, 126.978);
    //         const marker = new window.kakao.maps.Marker({
    //             position: markerPosition
    //         });
    //         marker.setMap(map);
    //     }
    // };


    return (
        <>
            <Map
                center={{ lat: 37.5665, lng: 126.978 }}
                style={{ width: "100%", height: "800px" }}
                level={3}
            >
                {
                    eventList.map(event => {
                         return <MapMarker position={{ lat: event.lat, lng: event.lng }} >

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
            {/* <div id={mapId} style={{ width: '100%', height: '100%' }} /> */}
        </>
    );
};

export default KakaoMap;
