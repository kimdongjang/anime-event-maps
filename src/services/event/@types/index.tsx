import { IImage } from '@/constants/common';

export interface IEvent {
  id: number;
  title: string;
  category: string;
  eventName: string;
  startDate: string;
  endDate: string;

  images?: IImage;

  priceList?: IPrice[];
  eventHall: string;
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
