import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MdFilterAlt } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';

import styles from './Sidebar.module.scss';
import { EventSummary } from '../Event/Summary';
import { SearchBox } from '../SearchBox';
import { IEvent } from '@/services/event/@types';
import { sampleEvents } from '@/constants/sample';
import { useRecoilState } from 'recoil';
import { IMarker } from '@/constants/common';
import { markerStore } from '@/stores/MarkerStore';
import { EventList } from '../Event/List';

interface ISidebar {
  handleShow: any;
  isShow: boolean;
  className?: string;
}
const Sidebar = (props: ISidebar) => {
  const { className, handleShow, isShow } = props;
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
          <div className="flex items-center m-3">
            <SearchBox className="w-full text-lg " />
            <MdFilterAlt size={32} className="text-gray-400 ml-1" />
          </div>
          <EventList />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
