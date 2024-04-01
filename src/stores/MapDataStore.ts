import { IMarker } from '@/constants/common';
import { FilterType, MainCategory } from '@/constants/enums';
import { IEvent } from '@/services/event/@types';
import { getLocalstorageEvent } from '@/utils/localStorages';
import { atom } from 'recoil';

export const markerStore = atom<IMarker[]>({
  key: `markerStore`,
  default: [],
});

export const searchListStore = atom<IEvent[]>({
  key: `searchListStore`,
  default: [],
});

export interface ISearchFilter {
  list: string[];
  type: FilterType;
  isEnd: boolean;
}
export const searchFilterStore = atom<ISearchFilter>({
  key: `searchFilterStore`,
  default: {
    list: [],
    type: FilterType.EVENT,
    isEnd: false,
  },
});

export const selectCategoryStore = atom<MainCategory>({
  key: `selectCategoryStore`,
  default: MainCategory.MAIN,
});

export const isSummaryStore = atom<boolean>({
  key: `isSummaryStore`,
  default: false,
});
