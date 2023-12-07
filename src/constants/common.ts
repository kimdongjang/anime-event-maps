import { IEvent } from '@/services/event/@types';
import { Coordinates } from '@/types/map';
import { FilterType } from './enums';

export interface IImage {
  id?: number;
  path: string; // 이미지 연결 주소
  alt: string;
  prefix?: string;
  width?: number;
  height?: number;
  size?: number;
}

export interface IMarker {
  checked: boolean;
  event: IEvent;
  marker: naver.maps.Marker;
  infoWindow: naver.maps.InfoWindow;
}

export interface IFilter {
  type: FilterType;
}

export interface ISelectOption {
  label: string;
  value: any;
}

export const searchFilterList: ISelectOption[] = [
  {
    label: '행사별',
    value: FilterType.EVENT,
  },
  {
    label: '행사장별',
    value: FilterType.LOCATION,
  },
  {
    label: '지역별',
    value: FilterType.ADDRESS,
  },
];
