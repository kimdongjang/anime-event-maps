import { IMarker } from '@/constants/common';
import useMapHook, { INITIAL_CENTER, INITIAL_ZOOM } from '@/hooks/useMapHook';
import { IEvent } from '@/services/event/@types';
import { eventListStore, searchListStore, selectCategoryStore } from '@/stores/MapDataStore';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useRecoilState } from 'recoil';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Image } from 'antd';
import { FilterType, MainCategory } from '@/constants/enums';
import { checkEndEvent } from '@/utils/date';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination,Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';

import { AiFillCaretRight } from "react-icons/ai";
import { AiFillCaretLeft } from "react-icons/ai";

const icon = L.icon({ iconUrl: "/images/markers/marker-icon.png" });

const Map = ({ mapId = 'map' }) => {
  const [eventList, setEventList] = useRecoilState(eventListStore);
  const [searchEventList, setSearchEventList] = useRecoilState(searchListStore);
  const [selectCategory, setSelectCategory] = useRecoilState(selectCategoryStore);

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
    console.log(eventHallList)

    switch (selectCategory) {
      case MainCategory.MAIN:
        return eventHallList.map((events, i) => {
          return renderMarkers(events)
        });
      case MainCategory.FAVORITE:
        return eventHallList.map((events, i) => {
          return events.filter((filter) => filter.isFavorite === true)
        }).map(events => renderMarkers(events));
      default:
        return <></>;
    }
  };

  const swiperRef = useRef<SwiperType>();
  const renderMarkers = (events: IEvent[]) => {
    // 모두 종료된 이벤트라면 마커를 생성하지 않기
    if(events.filter(event => checkEndEvent(new Date(event.endDate))).length === 0){
      return;
    }

    return (
      <Marker position={{ lat: events[0].lat, lng: events[0].lng }} icon={icon} >
        <Popup className='w-[300px]'>

          <Swiper
            pagination={{
              type: 'fraction',
            }}
            navigation={false}
            modules={[Pagination, Navigation]}
            className="mySwiper"
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {events.map((event, i) => {
              // 종료된 이벤트가 체크되어 있다면 전체 출력
              if (searchEventList.isEnd) {
                return (
                  <SwiperSlide className='p-3 pb-10' key={i}>
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
                    <SwiperSlide className='p-3 pb-10' key={i}>
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
            })}
          </Swiper>
        <div>
          <button onClick={() => swiperRef.current?.slidePrev()} className='fixed bottom-[5%] left-[35%] z-[1]'><AiFillCaretLeft className='text-blue-500' size={30}/></button>
          <button onClick={() => swiperRef.current?.slideNext()} className='fixed bottom-[5%] right-[35%] z-[1]'><AiFillCaretRight className='text-blue-500' size={30}/></button>
        </div>
        </Popup>
      </Marker>
    )
  }


  return (
    <div >
      {/* <div id={mapId} style={{ width: '100%', height: '100%' }} /> */}
      <MapContainer center={INITIAL_CENTER} zoom={11} scrollWheelZoom={true} style={{ height: '1600px', zIndex: 0 }} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderList()}
      </MapContainer>
    </div>
  );
};

export default Map;
