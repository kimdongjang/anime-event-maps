import { IEvent } from '@/services/event/@types';
import { Coordinates } from '@/types/map';
import { FilterType } from './enums';

export interface IImage {
  id?: number;
  eventId?:number;
  path: string; // 이미지 연결 주소
  alt: string;
  prefix?: string;
  width?: number;
  height?: number;
  size?: number;
}

export interface IFilter {
  type: FilterType;
}

export interface ISelectOption {
  label: string;
  value: any;
}

export interface ITableColumn {
  title: string;
  dataIndex: string;
  key: string;
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
