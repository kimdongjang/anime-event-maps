import { FilterType, MainCategory } from '@/constants/enums';
import useMapHook from '@/hooks/useMapHook';
import { IEvent } from '@/services/event/@types';
import {
  isSummaryStore,
  markerStore,
  searchFilterStore,
  searchListStore,
  selectCategoryStore,
} from '@/stores/MapDataStore';
import { mobileIsOpenStore } from '@/stores/MobileStore';
import { checkEndEvent } from '@/utils/date';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { EventDisplay } from '../Display';
import { EventSummary } from '../Summary';

export const EventList = () => {
  const [isMobileShow, setIsMobileShow] = useRecoilState(mobileIsOpenStore);
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [filter, setFilter] = useRecoilState(searchFilterStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const [isSummary, setIsSummary] = useRecoilState(isSummaryStore);
  const { morphMarker, openInfoWindow } = useMapHook();
  const router = useRouter();

  const handleEventClick = (event: IEvent) => {
    router.push(`?id=${event.id.toString()}`);
  };
  const filterList = () => {
    if (filter.list.length === 0) {
      return searchList;
    } else {
      switch (filter.type) {
        case FilterType.EVENT:
          return searchList.filter((event) => {
            // 필터에 추가된 이름들과 일치한다면
            if (!!filter.list.find((f) => f === event.event)) {
              return event;
            }
          });
        case FilterType.ADDRESS:
          return searchList.filter((event) => {
            // 필터에 추가된 이름들과 일치한다면
            if (!!filter.list.find((f) => event.doroAddress.includes(f))) {
              return event;
            }
          });

        case FilterType.LOCATION:
          return searchList.filter((event) => {
            // 필터에 추가된 이름들과 일치한다면
            if (!!filter.list.find((f) => f === event.eventHall)) {
              return event;
            }
          });
        default:
          return searchList;
      }
    }
  };
  const renderEventList = () => {
    const renderList = filterList();
    switch (selectCategory) {
      case MainCategory.MAIN:
        return renderList.map((event, i) => {
          // 종료된 이벤트가 체크되어 있다면
          if (filter.isEnd) {
            if(isSummary){
              <EventSummary event={event} key={i} onClick={handleEventClick} />
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
                  <EventSummary
                    event={event}
                    key={i}
                    onClick={handleEventClick}
                  />
                );
              }
              else{
                return (
                  <EventDisplay
                    event={event}
                    key={i}
                    onClick={handleEventClick}
                  />
                );
              }
            }
          }
        });
      case MainCategory.FAVORITE:
        return searchList
          .filter((filter) => filter.isFavorite === true)
          .map((data, i) => (
            <EventDisplay event={data} key={i} onClick={handleEventClick} />
          ));
      default:
        break;
    }
  };
  return <>{renderEventList()}</>;
};
