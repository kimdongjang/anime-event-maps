import { IImage } from '@/constants/common';

export interface IEvent {
  id: number;
  title: string;
  category: string;
  event: string;
  startDate: string;
  endDate: string;

  images: IImage;

  minPrice?: number;
  maxPrice?: number;
  eventHall: string;
  address: string;
  jibunAddress: string;
  doroAddress: string;
  lat: number;
  lng: number;

  site?: string;
  isFavorite: boolean;
}
