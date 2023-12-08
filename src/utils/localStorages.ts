import { IEvent } from '@/services/event/@types';

export const getLocalstorageEvent = () => {
  const temp = localStorage.getItem('myFavoriteList');
  // 스토리지가 비어있을 경우, 초기값은 배열로 저장
  return !!temp ? JSON.parse(temp) : [];
};
export const setLocalstorageEvent = (value: IEvent) => {
  const temp: IEvent[] = getLocalstorageEvent();
  // 스토리지에 저장되지 않은 항목일 경우
  let idx = temp.findIndex((event) => event.id == value.id);
  if (idx <= -1) {
    temp.push({ ...value });
  } else {
    temp.splice(idx, 1);
  }
  localStorage.setItem('myFavoriteList', JSON.stringify([...temp]));
};

export const getLocalstorageNotice = () => {
  const temp = localStorage.getItem(`isReadNotice1.0.0`);
  // 스토리지가 비어있을 경우, 초기값은 배열로 저장
  return !!temp ? JSON.parse(temp) : undefined;
};

export const setLocalstorageNotice = () => {
  let nextDate = new Date();
  nextDate.setDate(nextDate.getDate() + 7);
  localStorage.setItem(
    'isReadNotice1.0.0',
    JSON.stringify({
      isRead: true,
      expire: nextDate,
    })
  );
};
