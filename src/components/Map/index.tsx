import { INITIAL_ZOOM } from '@/hooks/useMapHook';
import { selectedEventStore, eventListStore, searchedListStore, selectServiceStore, curPositionStore } from '@/stores/MapDataStore';
import { Coordinates } from '@/types/map';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { IEvent, Marker } from '@/services/event/@types';
import { MainCategory } from '@/constants/enums';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { Image } from 'antd';


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
    initialZoom = INITIAL_ZOOM,
}: Props) => {
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_NCP_CLIENT_ID;
    const [scriptLoad, setScriptLoad] = useState<boolean>(false);

    const [eventList, setEventList] = useRecoilState(eventListStore);
    const [searchedEventList, setSearchedEventList] = useRecoilState(searchedListStore);
    const [position, setPosistion] = useRecoilState(curPositionStore);
    const [selectCategory, setSelectCategory] = useRecoilState(selectServiceStore);
    const [selectedEvent, setSelectedEvent] = useRecoilState(selectedEventStore);
    const [renderMarkerList, setRenderMarkerList] = useState<Marker[]>();

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
        const eventHallFilter: Marker[] = list
            .filter((data) => data.eventHall !== null)
            .map((data) => {
                return {
                    id: data.id,
                    eventHall: data.eventHall,
                    lat: data.lat,
                    lng: data.lng
                }
            }).reduce((acc: any, current) => {
                // 중복 여부 확인
                const isDuplicate = acc.some((event: { eventHall: string; }) => event.eventHall === current.eventHall);
                if (!isDuplicate) {
                    acc.push(current);
                }
                return acc;
            }, [])


        // 행사장 별로 묶어서 마커 리스트를 초기화
        const eventHallList: Marker[] = eventHallFilter.map(hall => {
            // 필터링된 이벤트 리스트를 이벤트 행사장별로 묶음
            const eventList = list.filter((event) => hall.eventHall === event.eventHall);

            if (eventList.length > 0) {
                return {
                    id: hall.id,
                    eventHall: hall.eventHall,
                    eventList: eventList,
                    lat: hall.lat,
                    lng: hall.lng,
                } as Marker;
            } else {
                return null; // undefined 대신 null로 처리
            }
        }).filter((marker) => marker !== null) as Marker[]  // null 값 필터링

        setRenderMarkerList(eventHallList)
    }
    useEffect(() => {
        renderList()
    }, [eventList])

    const swiperRefs = useRef<SwiperType[]>([]);


    return (
        <>
            {scriptLoad ?
                <Map
                    center={{ lat: position.lat, lng: position.lng }}
                    style={{ width: "100%", height: "100%" }}
                    level={9}
                    // 드래그가 끝나면 position을 변경해줘야함.
                    // 변경하지 않을 경우 해당 포지션의 값이 동일한 경우 마커 이동 이벤트가 작동하지 않음
                    onDragEnd={map => { setPosistion({ lat: map.getCenter().getLat(), lng: map.getCenter().getLng(), }) }}
                >
                    {
                        /**
                         * 1. 이벤트 홀(행사장 위치)에 대한 마커 리스트를 렌더링
                         */
                        renderMarkerList && renderMarkerList.map((marker, i) => {
                            return (
                                <MapMarker key={marker.id} position={{ lat: marker.lat, lng: marker.lng }}
                                    onClick={(map) => {
                                        /**
                                         * 마커를 클릭할 경우 선택한 마커를 선택된 이벤트로 등록함
                                         * -> 이벤트의 인포 윈도우를 보여줌
                                         */
                                        const findEvent = eventList.find(data => data.id === marker.id);
                                        if (!!findEvent) {
                                            if (selectedEvent && (selectedEvent.id === findEvent.id)) {
                                                setSelectedEvent(null)
                                            }
                                            else {
                                                setSelectedEvent(findEvent)
                                            }
                                        }
                                    }}>
                                    {
                                        /**
                                         * 선택된 이벤트와 마커의 아이디가 같을 경우 인포 윈도우를 보여줌
                                         */
                                        selectedEvent && (selectedEvent.id === marker.id) && (
                                            <div className=''>
                                                <Swiper
                                                    pagination={{
                                                        type: 'fraction',
                                                    }}
                                                    slidesPerView={1} // 한 번에 하나의 슬라이드만 표시
                                                    navigation={false} //  내장 내비게이션 비활성화
                                                    modules={[Pagination, Navigation]}
                                                    className="mySwiper w-[300px]"
                                                    onBeforeInit={(swiper) => {
                                                        swiperRefs.current[i] = swiper;
                                                    }}>
                                                    {
                                                        marker.eventList.map(((event, j) => (
                                                            <SwiperSlide className='p-3' key={j}>
                                                                <Image src={event.images?.path} />
                                                                <h3>{event.title}</h3>
                                                                <div className='m-0'>{event.address}</div>
                                                                <div className='flex items-center'>
                                                                    <label className="bg-yellow-100 border-gray-100 rounded font-medium px-1">기간</label>
                                                                    <span>{event.startDate}~{event.endDate}</span>
                                                                </div>
                                                            </SwiperSlide>
                                                        )))}
                                                    <div className='flex justify-center'>
                                                        <button onClick={() => swiperRefs.current[i]?.slidePrev()} className='z-[1]'><AiFillCaretLeft className='text-blue-500' size={30} /></button>
                                                        <button onClick={() => swiperRefs.current[i]?.slideNext()} className='z-[1]'><AiFillCaretRight className='text-blue-500' size={30} /></button>
                                                    </div>
                                                </Swiper>
                                            </div>
                                        )
                                    }
                                </MapMarker >
                            )
                        })}
                </Map >
                :
                <div></div>
            }
        </>
    );
};

export default KakaoMap;
