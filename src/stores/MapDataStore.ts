import { IMarker } from '@/constants/common';
import { FilterType, MainCategory } from '@/constants/enums';
import { IEvent } from '@/services/event/@types';
import { getLocalstorageEvent } from '@/utils/localStorages';
import { atom } from 'recoil';

/**
 * 현재 렌더링 되고 있는 마커 리스트
 */
export const markerStore = atom<IMarker[]>({
  key: `markerStore`,
  default: [],
});

/**
 * 모든 행사장 리스트(시간 순서 별)
 */
export const eventListStore = atom<IEvent[]>({
  key: `eventListStore`,
  default: [],
});

export interface ISearchList {
  addedEventList: IEvent[];
  type: FilterType;
  isEnd: boolean;
}
/**
 * 선택한 필터(이벤트별, 행사별, 행사장별)
 */
export const searchListStore = atom<ISearchList>({
  key: `searchListStore`,
  default: {
    addedEventList: [], // 선택한 필터를 기반으로 추가된 이벤트들(예: 이벤트별을 선택하고 난 뒤, A이벤트, B이벤트 등등이 이 list에 추가됨)
    type: FilterType.EVENT,
    isEnd: false,
  },
});

/**
 * 선택한 카테고리(메인, 즐겨찾기, 캘린더)
 */
export const selectCategoryStore = atom<MainCategory>({
  key: `selectCategoryStore`,
  default: MainCategory.MAIN,
});

/**
 * 이벤트 요약해서 보기(true:요약, false:펼쳐보기)
 */
export const isSummaryStore = atom<boolean>({
  key: `isSummaryStore`,
  default: false,
});
