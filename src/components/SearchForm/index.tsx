import { searchFilterList } from '@/constants/common';
import { MainCategory } from '@/constants/enums';
import { sortMenuItems } from '@/constants/menuItems';
import { searchListStore, selectCategoryStore } from '@/stores/MapDataStore';
import { Checkbox, Dropdown, Select } from 'antd';
import _ from 'lodash';
import { useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import { MdFilterAlt, MdHome, MdOutlineStar } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { EventList } from '../Event/List';
import { SearchBox } from '../SearchBox';

export const SearchForm = () => {
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const [openFilter, setOpenFilter] = useState(false);

  const handleSelectFilter = (value: number) => {
    let finder = _.find(searchFilterList, {
      value: value,
    });
    // let tempList = [...genreList];
    // if (!!finder) {
    //   tempList.push(finder);
    //   setGenreList(tempList);
    // }
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
        <div>
          <div className="flex items-center justify-between mx-1 mb-1">
            <Select
              options={searchFilterList}
              defaultValue={1}
              className="p-1"
              onChange={handleSelectFilter}
            />
            <Checkbox className="">{'종료된 이벤트'}</Checkbox>
          </div>
          <div className="flex flex-wrap space-x-2 mb-3 mx-3">
            {[...filterList].map((data, i) => {
              return (
                <button key={i} className="border p-1 rounded-xl">
                  <h4>{data}</h4>
                </button>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
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
  );
};
