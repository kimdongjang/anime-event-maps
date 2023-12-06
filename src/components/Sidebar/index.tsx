import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {
  MdFilterAlt,
  MdHome,
  MdOutlineStar,
  MdOutlineStarBorder,
} from 'react-icons/md';
import { FaSortAmountDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import styles from './Sidebar.module.scss';
import { SearchBox } from '../SearchBox';
import { useRecoilState } from 'recoil';
import {
  markerStore,
  searchListStore,
  selectCategoryStore,
} from '@/stores/MapDataStore';
import { EventList } from '../Event/List';
import { MainCategory } from '@/constants/enums';
import { Dropdown, Select } from 'antd';
import { sortMenuItems } from '@/constants/menuItems';

interface ISidebar {
  handleShow: any;
  isShow: boolean;
  className?: string;
}
const Sidebar = (props: ISidebar) => {
  const { className, handleShow, isShow } = props;
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const [openFilter, setOpenFilter] = useState(false);

  const renderOpenBtn = () => {
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
  const renderCategory = () => {
    return (
      <div className={'w-full flex items-center'}>
        <button
          className={`w-full h-full flex justify-center items-center text-indigo-400 p-2
  ${selectCategory === MainCategory.MAIN ? 'bg-white' : 'bg-gray-50 border'}`}
          type="button"
          onClick={() => setSelectCategory(MainCategory.MAIN)}
        >
          <MdHome size={22} />
          <h3>메인</h3>
        </button>
        <button
          className={`w-full h-full flex justify-center items-center text-yellow-400 p-2
        ${
          selectCategory === MainCategory.FAVORITE
            ? 'bg-white'
            : 'bg-gray-50 border'
        }`}
          type="button"
          onClick={() => setSelectCategory(MainCategory.FAVORITE)}
        >
          <MdOutlineStar size={22} />
          <h3>북마크</h3>
        </button>
      </div>
    );
  };

  const renderSortBtn = () => {
    return (
      <button className="text-gray-400 ml-1">
        <Dropdown menu={{ items: sortMenuItems }} trigger={['click']}>
          <FaSortAmountDown size={24} />
        </Dropdown>
      </button>
    );
  };
  const renderFilterBtn = () => {
    return (
      <button
        className={`${
          !!openFilter ? 'text-indigo-500 ' : 'text-gray-400'
        } ml-1`}
        onClick={() => setOpenFilter(!openFilter)}
      >
        <MdFilterAlt size={32} />
      </button>
    );
  };
  const renderFilterList = () => {
    const filterList = new Set(searchList.map((data) => data.event));
    if (!!openFilter) {
      return (
        <div className="flex">
          {[...filterList].map((data, i) => {
            return <label key={i}>{data}</label>;
          })}
        </div>
      );
    }
  };

  return (
    <aside className={`fixed flex h-full ${className}`}>
      <div
        className={`bg-white h-full w-0 md:w-[45%] lg:w-[40%] xl:w-[35%] flex overflow-y-scroll ${
          isShow ? styles.show_side_bar : styles.close_side_bar
        }`}
      >
        <div className="sticky top-0">{renderOpenBtn()}</div>
        <div className="flex flex-col w-full bg-white">
          {renderCategory()}
          <div className="flex items-center m-3">
            <SearchBox className="w-full text-base " />
            {renderSortBtn()}
            {renderFilterBtn()}
          </div>
          {renderFilterList()}
          <EventList />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
