import { INITIAL_CENTER } from '@/constants/common';
import { FilterType, MainCategory } from '@/constants/enums';
import { IEvent, SearchedList } from '@/services/event/@types';
import { Coordinates } from '@/types/map';
import { getLocalstorageEvent } from '@/utils/localStorages';
import { atom } from 'recoil';

/**
 * 모든 행사장 리스트(시간 순서 별)
 */
export const eventListStore = atom<IEvent[]>({
  key: `eventListStore`,
  default: [],
});

/**
 * 선택한 필터로 검색된 이벤트 리스트(이벤트별, 행사별, 행사장별)
 * 모든 렌더링 되는 이벤트 리스트는 이게 기준임
 */
export const searchedListStore = atom<SearchedList>({
  key: `searchListStore`,
  default: {
    searchedList: [], // 선택한 필터를 기반으로 추가된 이벤트들(예: 이벤트별을 선택하고 난 뒤, A이벤트, B이벤트 등등이 이 list에 추가됨)
    addedFilter: [],
    type: FilterType.EVENT,
    isEnd: true,
  },
});

/**
 * 선택한 서비스(메인, 즐겨찾기, 캘린더)
 */
export const selectServiceStore = atom<MainCategory>({
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

/**
 * 현재 위치
 */
export const curPositionStore = atom<Coordinates>({
  key: `curPositionStore`,
  default: INITIAL_CENTER,
});

/**
 * 현재 선택된 이벤트(null 가능)
 */
export const selectedEventStore = atom<IEvent|null>({
  key: `selectedEventStore`,
  default: null,
});
