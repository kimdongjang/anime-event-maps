import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  MdFilterAlt,
  MdHome,
  MdOutlineStar,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';

import styles from './Sidebar.module.scss';
import { EventSummary } from '../Event/Summary';
import { SearchBox } from '../SearchBox';
import { IEvent } from '@/services/event/@types';
import { sampleEvents } from '@/constants/sample';
import { useRecoilState } from 'recoil';
import { IMarker } from '@/constants/common';
import { markerStore, selectCategoryStore } from '@/stores/MapDataStore';
import { EventList } from '../Event/List';
import { useSearchData } from '@/hooks/useSearchData';
import { MainCategory } from '@/constants/enums';

interface ISidebar {
  handleShow: any;
  isShow: boolean;
  className?: string;
}
const Sidebar = (props: ISidebar) => {
  const { className, handleShow, isShow } = props;
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const renderBtn = () => {
    if (isShow) {
      return (
        <button
          className="rounded  bg-blue-300 hover:bg-blue-200 h-full w-10"
          onClick={() => handleShow(false)}
        >
          <ChevronRightIcon />
        </button>
      );
    } else {
      return (
        <button
          className="rounded  bg-blue-300 hover:bg-blue-200 h-full w-10"
          onClick={() => handleShow(true)}
        >
          <ChevronLeftIcon />
        </button>
      );
    }
  };

  return (
    <aside className={`fixed flex h-full ${className}`}>
      <div
        className={`bg-gray-50 h-full w-0 md:w-[45%] lg:w-[40%] xl:w-[35%] flex overflow-y-scroll ${
          isShow ? styles.show_side_bar : styles.close_side_bar
        }`}
      >
        <div className="sticky top-0">{renderBtn()}</div>
        <div className="flex flex-col w-full">
          <div className={'w-full flex items-center'}>
            <button
              className="w-full h-full flex  justify-center items-center 
        bg-gray-50 border text-blue-400 p-2"
              type="button"
              onClick={() => setSelectCategory(MainCategory.MAIN)}
            >
              <MdHome size={22} />
              <p>메인</p>
            </button>
            <button
              className="w-full h-full flex justify-center items-center 
        bg-gray-100 border text-yellow-400 p-2"
              type="button"
              onClick={() => setSelectCategory(MainCategory.FAVORITE)}
            >
              <MdOutlineStar size={22} />
              <p>북마크</p>
            </button>
          </div>
          <div className="flex items-center m-3">
            <SearchBox className="w-full text-base " />
            <MdFilterAlt size={32} className="text-gray-400 ml-1" />
          </div>
          <EventList />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
