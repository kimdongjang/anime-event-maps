import { IEvent } from '@/services/event/@types';

export const sampleEvents: IEvent[] = [
  {
    id: 1,
    title: '2023 AGF',
    category: '게임&애니메이션 행사',
    startDate: '2023-12-02',
    endDate: '2024-12-03',
    adress: '일산 킨텍스',
    doroAddress: '경기 고양시 일산서구 킨텍스로 217-60',
    jibunAddress: '경기 고양시 대화동 2600',
    lat: 37.672114742842,
    lng: 126.75344229799,
    images: [
      {
        path: '/images/agf2023.jpg',
        alt: '/anime-event-maps/agf2023'
      }
    ]
  },
  {
    id: 2,
    title: '2023 Winter 서울 코믹월드',
    category: '애니메이션 행사',
    startDate: '2023-12-16',
    endDate: '2023-12-17',
    adress: '양재 AT센터',
    doroAddress: '서울특별시 서초구 양재2동 강남대로 27 aT센터',
    jibunAddress: '경기 고양시 대화동 2600',
    lat: 37.468581,
    lng: 127.038989,
    images: [
      {
        path: '/images/2023seoulcomic.png',
        alt: '/anime-event-maps/2023seoulcomic'
      }
    ]
  },
  {
    id: 3,
    title: '팝콘 행사',
    category: '게임행사',
    startDate: '2024-02-01',
    endDate: '2024-02-04',
    adress: '삼성 코엑스',
    doroAddress: '서울특별시 강남구 영동대로 513',
    jibunAddress: '경기 고양시 대화동 2600',
    lat: 37.511817,
    lng: 127.059122,
  },
  // {
  //   id: 4,
  //   title: '이터널리티 행사',
  //   category: '게임행사',
  //   startDate: '2024-02-01',
  //   endDate: '2024-02-04',
  //   adress: '일산 킨텍스',
  //   doroAddress: '경기 고양시 일산서구 킨텍스로 217-60',
  //   jibunAddress: '경기 고양시 대화동 2600',
  //   lat: 37.672114742842,
  //   lng: 126.75344229799,
  // },
  // {
  //   id: 5,
  //   title: '이터널리티 행사',
  //   category: '게임행사',
  //   startDate: '2024-02-01',
  //   endDate: '2024-02-04',
  //   adress: '일산 킨텍스',
  //   doroAddress: '경기 고양시 일산서구 킨텍스로 217-60',
  //   jibunAddress: '경기 고양시 대화동 2600',
  //   lat: 37.672114742842,
  //   lng: 126.75344229799,
  // },
  // {
  //   id: 6,
  //   title: '이터널리티 행사',
  //   category: '게임행사',
  //   startDate: '2024-02-01',
  //   endDate: '2024-02-04',
  //   adress: '일산 킨텍스',
  //   doroAddress: '경기 고양시 일산서구 킨텍스로 217-60',
  //   jibunAddress: '경기 고양시 대화동 2600',
  //   lat: 37.672114742842,
  //   lng: 126.75344229799,
  // },
  // {
  //   id: 7,
  //   title: '이터널리티 행사',
  //   category: '게임행사',
  //   startDate: '2024-02-01',
  //   endDate: '2024-02-04',
  //   adress: '일산 킨텍스',
  //   doroAddress: '경기 고양시 일산서구 킨텍스로 217-60',
  //   jibunAddress: '경기 고양시 대화동 2600',
  //   lat: 37.672114742842,
  //   lng: 126.75344229799,
  // },
];
