import { IImage } from '@/constants/common';
import { FilterType } from '@/constants/enums';

export interface IEvent {
  id: number;
  title: string; // 행사 제목(제 몇회 어쩌구...)
  category: string; // 카테고리
  eventName: string; // 행사 이름(코믹랜드 등)
  startDate: string;
  endDate: string;

  images?: IImage;

  priceList?: IPrice[]; // 가격 정보
  eventHall: string; // 행사장 이름
  address: string; 
  jibunAddress: string;
  doroAddress: string;
  lat: number;
  lng: number;

  site?: string;
  isFavorite: boolean;
  titleImage?: string;
}

export interface ICategory {
  id: number;
  name:string;
}

export interface IPrice {
  type?: string;
  name: string;
  price: number;
}

export interface Marker {
  eventHall: string;
  eventList: IEvent[];
  lat: number;
  lng: number;
  
}

export interface SearchedList {
  searchedList: IEvent[]; // 검색된 리스트
  addedFilter: string[],
  type: FilterType;
  isEnd: boolean; // 종료된 이벤트 포함 여부
}
