
export interface IEventTemplate {
  id: number;
  eventName: string; // 이벤트 이름
  category: string; // 카테고리 이름
  websiteUrl: string; // 웹사이트 주소
  imageUrl?: string; // 이미지 주소
}

export interface IEventHallTemplate {
  id: number;
  hallName: string; // 행사장 이름
  roadAddress: string; // 도로명
  jibunAddress: string; // 지번
  latitude: number; // 위도
  longitude: number; // 경도
}