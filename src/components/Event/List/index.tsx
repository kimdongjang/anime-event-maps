import { MainCategory } from '@/constants/enums';
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
  const renderEventList = () => {
    switch (selectCategory) {
      case MainCategory.MAIN:
        return searchList.map((data, i) => {
          if (filter.isEnd) {
            return (
              <EventSummary event={data} key={i} onClick={handleEventClick} />
            );
          } else {
            if (checkEndEvent(new Date(data.endDate))) {
              return (
                <EventSummary event={data} key={i} onClick={handleEventClick} />
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
