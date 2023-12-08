import { FilterType, MainCategory } from '@/constants/enums';
import useMapHook from '@/hooks/useMapHook';
import { IEvent } from '@/services/event/@types';
import {
  markerStore,
  searchFilterStore,
  searchListStore,
  selectCategoryStore,
} from '@/stores/MapDataStore';
import { mobileIsOpenStore } from '@/stores/MobileStore';
import { checkEndEvent } from '@/utils/date';
import { useRecoilState } from 'recoil';
import { EventSummary } from '../Summary';

export const EventList = () => {
  const [isMobileShow, setIsMobileShow] = useRecoilState(mobileIsOpenStore);
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [filter, setFilter] = useRecoilState(searchFilterStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const { morphMarker, openInfoWindow } = useMapHook();

  const handleEventClick = (event: IEvent) => {
    morphMarker(event);
    // 화면이 깨지는 이슈가 있어서 1.5초후에 적용
    setTimeout(() => openInfoWindow(event), 1500);

    // 모바일인 경우 편의성을 위해 창을 내려줌
    setIsMobileShow(false);
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
            return (
              <EventSummary event={event} key={i} onClick={handleEventClick} />
            );
          } else {
            // 종료 날짜를 비교해서 예정된 이벤트만 출력
            if (checkEndEvent(new Date(event.endDate))) {
              return (
                <EventSummary
                  event={event}
                  key={i}
                  onClick={handleEventClick}
                />
              );
            }
          }
        });
      case MainCategory.FAVORITE:
        return searchList
          .filter((filter) => filter.isFavorite === true)
          .map((data, i) => (
            <EventSummary event={data} key={i} onClick={handleEventClick} />
          ));
      default:
        break;
    }
  };
  return <>{renderEventList()}</>;
};
