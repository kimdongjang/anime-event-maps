import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { MdFilterAlt } from 'react-icons/md';
import { useState } from 'react';
import { IconButton } from '@mui/material';

import styles from './Sidebar.module.scss';
import { EventSummary } from '../Event/Summary';
import { SearchBox } from '../SearchBox';
import { IEvent } from '@/services/event/@types';

interface ISidebar {
  className?: string;
}
const Sidebar = (props: ISidebar) => {
  const { className } = props;
  const [isShow, setIsShow] = useState(false);
  const renderBtn = () => {
    if (isShow) {
      return (
        <button
          className="bg-blue-200 h-full w-10"
          onClick={() => setIsShow(false)}
        >
          <ChevronRightIcon />
        </button>
      );
    } else {
      return (
        <button
          className="bg-blue-200 h-full w-10"
          onClick={() => setIsShow(true)}
        >
          <ChevronLeftIcon />
        </button>
      );
    }
  };

  const sampleEvents: IEvent[] = [
    {
      title: '이터널리티 행사',
      category: '게임행사',
      startDate: '2024-02-01',
      endDate: '2024-02-04',
    },
    {
      title: '이터널리티 행사',
      category: '게임행사',
      startDate: '2024-02-01',
      endDate: '2024-02-04',
    },
    {
      title: '이터널리티 행사',
      category: '게임행사',
      startDate: '2024-02-01',
      endDate: '2024-02-04',
    },
    {
      title: '이터널리티 행사',
      category: '게임행사',
      startDate: '2024-02-01',
      endDate: '2024-02-04',
    },
  ];

  const renderEventList = () => {
    return sampleEvents.map((data, i) => <EventSummary event={data} key={i} />);
  };
  return (
    <aside className={`fixed flex h-full`}>
      <div
        className={`bg-gray-50 h-full w-[30%] flex ${
          isShow ? styles.show_side_bar : styles.close_side_bar
        }`}
      >
        <div className="relative ">{renderBtn()}</div>
        <div className="flex flex-col w-full">
          <div className="flex items-center m-3">
            <SearchBox className="w-full text-lg" />
            <MdFilterAlt size={32} className="text-gray-400 ml-1" />
          </div>
          {renderEventList()}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
