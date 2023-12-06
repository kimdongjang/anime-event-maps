import { IEvent } from '@/services/event/@types';
import {
  MdLocationOn,
  MdOutlineStar,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { useRouter } from 'next/navigation';
import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import Image from 'next/image';
import { currentSummaryDate } from '@/utils/date';
import { setLocalstorageEvent } from '@/utils/localStorages';
import { useSearchData } from '@/hooks/useSearchData'
import { FaCaretRight } from "react-icons/fa6";

interface IEventSummaryProps {
  event: IEvent;
  className?: string;
  onClick: (event: IEvent) => void;
}

export const EventSummary = (props: IEventSummaryProps) => {
  const router = useRouter();
  const { event, className, onClick } = props;
  const { setFavoriteEvent } = useSearchData();

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };
  const renderFavoriteBtn = () => {
    if (!!event.isFavorite) {
      return (
        <button
          className="rounded-full text-yellow-400 
     border border-yellow-400 p-1"
          type="button"
          onClick={() => {
            setFavoriteEvent(event, false);
          }}
        >
          <MdOutlineStar size={18} />
        </button>
      );
    } else {
      return (
        <button
          className="rounded-full text-gray-400 
         border border-gray-400  p-1"
          type="button"
          onClick={() => {
            setFavoriteEvent(event, true);
          }}
        >
          <MdOutlineStarBorder size={18} />
        </button>
      );
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
        <label className="bg-red-100 border-gray-100 rounded text-sm font-medium px-1">
          입장권
        </label>
        {price}
      </div>
    );
  };

  return (
    <div className={classNames(className, 'bg-white w-full')}>
      <div className="p-3">
        {/* 타이틀 */}
        <div className="flex justify-between py-2">
          {/* <h2>{currentSummaryDate(new Date(event.startDate))}</h2> */}
          <h2 className="font-bold text-xl cursor-pointer">{event.title}</h2>
        </div>
        {/* 이미지 */}
        <div>
          {
            <Image
              className="event_summary__bg_image max-h-[180px]"
              src={event.images.path}
              alt={event.images.alt}
              fill
              objectFit="cover"
            />
          }
        </div>
        <div>
          <a className="p-1">{event.site}</a>
        </div>
        <div className="flex justify-between items-center  p-1">
          <div className="space-x-1">
            <label className="font-medium">{event.address}</label>
            <label className="text-gray-400 text-sm">{event.category}</label>
          </div>
          {renderFavoriteBtn()}
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
      </div>
      <div className="flex justify-end space-x-1 p-3">
        <button
          className="bg-blue-400 hover:bg-blue-500 text-white text-sm rounded px-2 py-1 "
          type="button"
          onClick={() => {
            router.push('https://map.naver.com/p/directions/');
          }}
        >
          네이버 길찾기
        </button>
        <button className='flex items-center text-sm px-2 py-1
           bg-sky-400 text-white rounded'
          type='button'
          onClick={() => {
            onClick(event);
          }}>
          지도에서보기
          <FaCaretRight size={16} />
        </button>
      </div>
    </div>
  );
};
