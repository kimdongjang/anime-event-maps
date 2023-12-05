import { MainCategory } from '@/constants/enums';
import useMapHook from '@/hooks/useMapHook';
import { useSearchData } from '@/hooks/useSearchData';
import { IEvent } from '@/services/event/@types';
import {
  markerStore,
  searchListStore,
  selectCategoryStore,
} from '@/stores/MapDataStore';
import { mobileIsOpenStore } from '@/stores/MobileStore';
import { useRecoilState } from 'recoil';
import { EventSummary } from '../Summary';

export const EventList = () => {
  const [isMobileShow, setIsMobileShow] = useRecoilState(mobileIsOpenStore);
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const { morphMarker } = useMapHook();

  const handleEventClick = (event: IEvent) => {
    morphMarker(event);
    // 모바일인 경우 편의성을 위해 창을 내려줌
    setIsMobileShow(false);
  };

  const renderEventList = () => {
    switch (selectCategory) {
      case MainCategory.MAIN:
        return searchList.map((data, i) => (
          <EventSummary event={data} key={i} onClick={handleEventClick} />
        ));
      case MainCategory.FAVORITE:
        return searchList
          .filter((filter) => filter.isFavorite)
          .map((data, i) => (
            <EventSummary event={data} key={i} onClick={handleEventClick} />
          ));
      default:
        break;
    }
  };
  return <>{renderEventList()}</>;
};
