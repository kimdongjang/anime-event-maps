import { IMarker } from '@/constants/common';
import { MainCategory } from '@/constants/enums';
import { sampleEvents } from '@/constants/sample';
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

export const selectCategoryStore = atom<MainCategory>({
  key: `selectCategoryStore`,
  default: MainCategory.MAIN,
});
