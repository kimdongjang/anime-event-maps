import { MainCategory } from '@/constants/enums';
import useMapHook from '@/hooks/useMapHook';
import { useSearchData } from '@/hooks/useSearchData';
import { IEvent } from '@/services/event/@types';
import {
  markerStore,
  searchListStore,
  selectCategoryStore,
} from '@/stores/MapDataStore';
import { useRecoilState } from 'recoil';
import { EventSummary } from '../Summary';

export const EventList = () => {
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const { morphMarker } = useMapHook();

  const handleEventClick = (event: IEvent) => {
    morphMarker(event);
    // const find = markerList.find((search) => search.event.id == event.id);
    // console.log(find);
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
