import { IEvent } from "@/services/event/@types";
import { Coordinates } from "@/types/map";

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
  infoWindow: naver.maps.InfoWindow

}
