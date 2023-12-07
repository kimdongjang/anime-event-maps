import { IMarker } from '@/constants/common';
import { MainCategory } from '@/constants/enums';
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
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { mutate } from 'swr';

export const EVENT_DATA_KEY = '/eventdata';

export const useSearchData = () => {
  const [searchList, setSearchList] = useRecoilState(searchListStore);

  // const [selectCategory, setSelectCategory] =
  //   useRecoilState(selectCategoryStore);

  // useEffect(() => {
  //   switch (selectCategory) {
  //     case MainCategory.MAIN:
  //       initSearchList();
  //       return;
  //     case MainCategory.FAVORITE:
  //       return;
  //     default:
  //       break;
  //   }
  // }, [selectCategory]);

  // 초기 로딩시 searchList 기반으로 초기화진행

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
