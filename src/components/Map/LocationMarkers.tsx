import useMapHook from "@/hooks/useMapHook";
import { Coordinates } from "@/types/map";
import { useEffect, useRef, useState } from "react"
import { Marker, Popup, useMapEvents } from "react-leaflet"
import L from 'leaflet';
import { curPositionStore, searchListStore } from "@/stores/MapDataStore";
import { useRecoilState } from "recoil";
import { IEvent } from "@/services/event/@types";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Image } from "antd";
import { checkEndEvent } from "@/utils/date";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";


const icon = L.icon({ iconUrl: "/images/markers/marker-icon.png" });

interface ILocationMarkers {
  events: IEvent[]
}
const LocationMarkers = (props: ILocationMarkers) => {
  // const { events } = props;
  // const [searchEventList, setSearchEventList] = useRecoilState(searchListStore);
  // const [curPosition, setCurPosition] = useRecoilState(curPositionStore);
  // const swiperRef = useRef<SwiperType>();

  // const map = useMapEvents({
  //   locationfound(e) {
  //     map.flyTo({lat:curPosition.lat-0.01, lng:curPosition.lng}, 15)
  //   },
  // })

  // useEffect(() => {
  //   map.locate();
  // }, [curPosition])

  // if (events.filter(event => checkEndEvent(new Date(event.endDate))).length === 0) {
  //   return <></>;
  // }

  return 
    // <Marker position={{ lat: events[0].lat, lng: events[0].lng }} icon={icon} >
    //   <Popup className='w-[300px]'>

    //     <Swiper
    //       pagination={{
    //         type: 'fraction',
    //       }}
    //       navigation={false}
    //       modules={[Pagination, Navigation]}
    //       className="mySwiper "
    //       onBeforeInit={(swiper) => {
    //         swiperRef.current = swiper;
    //       }}
    //     >
    //       {events.map((event, i) => {
    //         // 종료된 이벤트가 체크되어 있다면 전체 출력
    //         if (searchEventList.isEnd) {
    //           return (
    //             <SwiperSlide className='p-3 pb-10 ' key={i}>
    //               <Image src={event.titleImage} />
    //               <h3>{event.title}</h3>
    //               <div className='m-0'>{event.address}</div>
    //               <div className='flex items-center'>
    //                 <span className="bg-yellow-100 border-gray-100 rounded text-sm font-medium px-1">기간</span>
    //                 <span>{event.startDate}~{event.endDate}</span>
    //               </div>
    //             </SwiperSlide>
    //           )
    //         } else {
    //           // 종료 날짜를 비교해서 예정된 이벤트만 출력
    //           if (checkEndEvent(new Date(event.endDate))) {
    //             return (
    //               <SwiperSlide className='p-3 pb-10 ' key={i}>
    //                 <Image src={event.titleImage} />
    //                 <h3>{event.title}</h3>
    //                 <div className='m-0'>{event.address}</div>
    //                 <div className='flex items-center'>
    //                   <span className="bg-yellow-100 border-gray-100 rounded text-sm font-medium px-1">기간</span>
    //                   <span>{event.startDate}~{event.endDate}</span>
    //                 </div>
    //               </SwiperSlide>
    //             )
    //           }
    //         }
    //       })}
    //     </Swiper>
    //     <div>
    //       <button onClick={() => swiperRef.current?.slidePrev()} className='fixed bottom-[5%] left-[35%] z-[1]'><AiFillCaretLeft className='text-blue-500' size={30} /></button>
    //       <button onClick={() => swiperRef.current?.slideNext()} className='fixed bottom-[5%] right-[35%] z-[1]'><AiFillCaretRight className='text-blue-500' size={30} /></button>
    //     </div>
    //   </Popup>
    // </Marker>
  // )
}

//   return (
//     <Marker position={curPosition} icon={icon} >
//       <Popup>
//         <div>

//         </div>
//       </Popup>
//     </Marker>
//   )
// }

export default LocationMarkers;