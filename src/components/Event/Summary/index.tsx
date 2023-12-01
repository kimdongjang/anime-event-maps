import { IEvent } from '@/services/event/@types';
import { MdLocationOn } from 'react-icons/md';
import { IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';

interface IEventSummaryProps {
  event: IEvent;
}

export const EventSummary = (props: IEventSummaryProps) => {
  const router = useRouter();
  const { event } = props;

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };
  const renderLocation = () => {
    let doroDiv = <></>;
    let jibunDiv = <></>;
    if (!!event.doroAddress) {
      doroDiv = (
        <div className="flex flex-wrap space-x-1">
          <p>{event.doroAddress}</p>
          <button
            className="px-1 rounded border text-sm"
            type="button"
            onClick={() => {
              handleCopyClipBoard(event.doroAddress as string);
            }}
          >
            복사
          </button>
        </div>
      );
    }
    if (!!event.jibunAddress) {
      jibunDiv = (
        <div className="flex flex-wrap space-x-1">
          <p>{event.jibunAddress}</p>
          <button
            className="px-1 rounded border text-sm"
            type="button"
            onClick={() => {
              handleCopyClipBoard(event.jibunAddress as string);
            }}
          >
            복사
          </button>
        </div>
      );
    }
    return (
      <div className="flex p-1">
        <MdLocationOn size={24} className="text-gray-400" />
        <div>
          {doroDiv}
          {jibunDiv}
        </div>
      </div>
    );
  };
  const renderPrice = () => {
    let price = <></>;
    if (!!event.minPrice) {
      price = (
        <>
          <p>{event.minPrice}</p>
          <p>~</p>
          <p>{event.maxPrice}</p>
        </>
      );
    } else {
      price = <p>무료</p>;
    }
    return (
      <div className="flex items-center space-x-1 p-1">
        <label className="bg-blue-50 border-gray-100 rounded text-sm font-medium px-1">
          입장권
        </label>
        {price}
      </div>
    );
  };
  return (
    <div className="bg-white p-3 m-1 w-full">
      {/* 타이틀 */}
      <h2 className="font-bold text-xl">{event.title}</h2>
      {/* 이미지 */}
      <div></div>
      <div className="flex items-end space-x-1 p-1">
        <label className="font-medium">{event.adress}</label>
        <label className="text-gray-400 text-sm">{event.category}</label>
      </div>
      <div className="flex items-center space-x-1 p-1">
        <label className="bg-yellow-100 border-gray-100 rounded text-sm font-medium px-1">
          기간
        </label>
        <p>{event.startDate}</p>
        <p>~</p>
        <p>{event.endDate}</p>
      </div>
      {renderPrice()}
      {/* 위치 */}
      {renderLocation()}
      <div className="flex justify-end">
        <button
          className="bg-blue-400 text-white text-sm px-2 rounded py-1 "
          type="button"
          onClick={() => {
            router.push('https://map.naver.com/directions');
          }}
        >
          네이버 길찾기
        </button>
      </div>
    </div>
  );
};