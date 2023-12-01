import { IImage } from '@/constants/common';

export interface IEvent {
  title: string;
  category: string;
  startDate: string;
  endDate: string;

  images?: IImage[];

  minPrice?: number;
  maxPrice?: number;
  jibunAddress?: string;
  doroAddress?: string;
}
