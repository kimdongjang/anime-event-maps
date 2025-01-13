declare module 'kakao.maps' {
  export interface LatLng {
    new(lat: number, lng: number): any;
  }
  export interface Map {
    new(container: HTMLElement, options: any): any;
  }
  export interface Marker {
    new(options: any): any;
    setMap(map: any): void;
  }
}
