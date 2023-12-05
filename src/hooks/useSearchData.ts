import { IMarker } from '@/constants/common';
import { MainCategory } from '@/constants/enums';
import { sampleEvents } from '@/constants/sample';
import { IEvent } from '@/services/event/@types';
import {
  markerStore,
  searchListStore,
  selectCategoryStore,
} from '@/stores/MapDataStore';
import {
  getLocalstorageEvent,
  setLocalstorageEvent,
} from '@/utils/localStorages';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useSearchData = () => {
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [markerList, setMarkerList] = useRecoilState(markerStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);

  useEffect(() => {
    switch (selectCategory) {
      case MainCategory.MAIN:
        initSearchList();
        // 마커 리스트 초기화
        let tempList: IMarker[] = [];
        sampleEvents.map((data, i) => {
          if (!!data.lat && !!data.lng) {
            tempList.push({
              coordinates: {
                lat: data.lat,
                lng: data.lng,
              },
              checked: true,
              event: data,
            });
          }
        });
        setMarkerList([...tempList]);
        return;
      case MainCategory.FAVORITE:
        return;
      default:
        break;
    }
  }, [selectCategory]);

  // 초기 로딩시 searchList 기반으로 초기화진행
  useEffect(() => {
    initSearchList();
  }, []);

  const initSearchList = () => {
    const locals: IEvent[] = getLocalstorageEvent();

    setSearchList(
      searchList.map((event) => {
        let find = locals.find((str) => str.id === event.id);
        if (!!find) {
          let temp = { ...event };
          temp.isFavorite = true;
          return temp;
        } else return event;
      })
    );
  };

  const setFavoriteEvent = (obj: IEvent, value: boolean) => {
    let tempList = [...searchList];
    let idx = tempList.findIndex((event) => event.id == obj.id);
    let copy = { ...obj };
    copy.isFavorite = value;
    tempList.splice(idx, 1, copy);
    setSearchList(tempList);
    setLocalstorageEvent(obj);
  };

  return {
    searchList,
    setFavoriteEvent,
  };
};
