import { FilterType, MainCategory } from '@/constants/enums';
import useMapHook from '@/hooks/useMapHook';
import { IEvent } from '@/services/event/@types';
import {
  isSummaryStore,
  markerStore,
  searchListStore,
  eventListStore,
  selectCategoryStore,
  curPositionStore,
} from '@/stores/MapDataStore';
import { mobileIsOpenStore } from '@/stores/MobileStore';
import { checkEndEvent } from '@/utils/date';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { EventDisplay } from '../Display';
import { EventSummary } from '../Summary';
import { useMapEvents } from 'react-leaflet';

export const EventList = () => {
  const [isMobileShow, setIsMobileShow] = useRecoilState(mobileIsOpenStore);
  const [eventList, setEventList] = useRecoilState(eventListStore);
  const [searchEventList, setSearchEventList] = useRecoilState(searchListStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  // 이벤트 리스트 요약 여부
  const [isSummary, setIsSummary] = useRecoilState(isSummaryStore);
  const [curPosition, setCurPosition] = useRecoilState(curPositionStore);  
  const router = useRouter();
  

  const handleEventClick = (event: IEvent) => {
    // morphMarker(event);
    setCurPosition({lat: event.lat, lng: event.lng});
    
    router.push(`?id=${event.id.toString()}`);
  };
  // const filterList = () => {
  //   if (searchEventList.addedEventList.length === 0) {
  //     return eventList;
  //   } else {
  //     switch (searchEventList.type) {
  //       case FilterType.EVENT:
  //         return eventList.filter((event) => {
  //           // 필터에 추가된 이름들과 일치한다면
  //           if (!!searchEventList.addedEventList.find((f) => f === event.event)) {
  //             return event;
  //           }
  //         });
  //       case FilterType.ADDRESS:
  //         return eventList.filter((event) => {
  //           // 필터에 추가된 이름들과 일치한다면
  //           if (!!searchEventList.addedEventList.find((f) => event.doroAddress.includes(f))) {
  //             return event;
  //           }
  //         });

  //       case FilterType.LOCATION:
  //         return eventList.filter((event) => {
  //           // 필터에 추가된 이름들과 일치한다면
  //           if (!!searchEventList.addedEventList.find((f) => f === event.eventHall)) {
  //             return event;
  //           }
  //         });
  //       default:
  //         return eventList;
  //     }
  //   }
  // };

  const renderEventList = () => {
    const renderList = searchEventList.searchedList.length !== 0 ? searchEventList.searchedList : eventList;

    switch (selectCategory) {
      case MainCategory.MAIN:
        return renderList.map((event, i) => {
          // 종료된 이벤트가 체크되어 있다면
          if (searchEventList.isEnd) {
            if(isSummary){
              return (
                <EventSummary event={event} key={i} onClick={handleEventClick} />
              )
            }
            else{
              return (
                <EventDisplay event={event} key={i} onClick={handleEventClick} />
              );
            }
          } else {
            // 종료 날짜를 비교해서 예정된 이벤트만 출력
            if (checkEndEvent(new Date(event.endDate))) {
              if(isSummary){
                return (
                  <EventSummary event={event} key={i} onClick={handleEventClick} />
                );
              }
              else{
                return (
                  <EventDisplay event={event} key={i} onClick={handleEventClick} />
                );
              }
            }
          }
        });
      case MainCategory.FAVORITE:
        return eventList
          .filter((filter) => filter.isFavorite === true)
          .map((event, i) => {
            if(isSummary){
              return (
                <EventSummary event={event} key={i} onClick={handleEventClick} />
              )
            }
            else{
              return (
                <EventDisplay event={event} key={i} onClick={handleEventClick} />
              );
            }
          });
      default:
        break;
    }
  };
  return <>{renderEventList()}</>;
};
