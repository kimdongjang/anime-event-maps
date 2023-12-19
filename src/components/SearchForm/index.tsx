import { searchFilterList } from '@/constants/common';
import { FilterType, MainCategory } from '@/constants/enums';
import { sortMenuItems } from '@/constants/menuItems';
import {
  searchFilterStore,
  searchListStore,
  selectCategoryStore,
} from '@/stores/MapDataStore';
import { Checkbox, Dropdown, Select } from 'antd';
import { useEffect, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import { IoCalendarNumber } from 'react-icons/io5';
import { MdFilterAlt, MdHome, MdOutlineStar, MdCheck } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { EventList } from '../Event/List';
import { SearchBox } from '../SearchBox';
import { Calendar } from '../Calendar';

export const SearchForm = () => {
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const [filter, setFilter] = useRecoilState(searchFilterStore);
  const [openFilter, setOpenFilter] = useState(true);
  const [filterList, setFilterList] = useState<string[]>([]);

  const handleSelectFilter = (value: number) => {
    setFilter({ list: [], type: value, isEnd: filter.isEnd });
  };

  const handleClickFilter = (data: string) => {
    let tempList = [...filter.list];
    console.log(data);
    let idx = tempList.findIndex((x) => x === data);
    // 못찾았으면 필터에 추가
    if (idx < 0) {
      tempList.push(data);
    }
    // 찾았으면 삭제
    else {
      tempList.splice(idx, 1);
    }
    setFilter({
      type: filter.type,
      list: tempList,
      isEnd: filter.isEnd,
    });
  };

  /**
   * 콤보박스 필터 변경시
   */
  useEffect(() => {
    switch (filter.type) {
      case FilterType.EVENT:
        setFilterList([...new Set(searchList.map((data) => data.event))]);
        break;
      case FilterType.LOCATION:
        setFilterList([...new Set(searchList.map((data) => data.eventHall))]);
        break;
      case FilterType.ADDRESS:
        setFilterList([
          ...new Set(
            searchList.map(
              (data) =>
                data.doroAddress?.split(' ')[0] +
                ' ' +
                data.doroAddress?.split(' ')[1]
            )
          ),
        ]);
        break;
    }
  }, [filter, searchList]);

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
        <button
          className={`w-full h-full flex justify-center items-center text-emerald-400 p-2
        ${
          selectCategory === MainCategory.CALENDER
            ? 'bg-white'
            : 'bg-gray-50 border'
        }`}
          type="button"
          onClick={() => setSelectCategory(MainCategory.CALENDER)}
        >
          <IoCalendarNumber size={22} />
          <h3>캘린더</h3>
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
          !!openFilter ? 'text-indigo-400 ' : 'text-gray-400'
        } ml-1`}
        onClick={() => {
          setOpenFilter(!openFilter);
        }}
      >
        <MdFilterAlt size={32} />
      </button>
    );
  };

  const renderFilterList = () => {
    return (
      <div className="flex flex-wrap space-x-2 mb-2 mx-3">
        {[...filterList].map((data, i) => {
          let finder = filter.list.find((x) => x === data);
          if (!!finder) {
            return (
              <button
                key={i}
                className="flex items-center
                 bg-blue-400 border border-blue-400
              text-white space-x-1 px-2 py-1 my-1 rounded-xl"
                type="button"
                onClick={() => handleClickFilter(data)}
              >
                <MdCheck />
                <h4>{data}</h4>
              </button>
            );
          } else {
            return (
              <button
                key={i}
                className="border px-2 py-1 my-1 rounded-xl"
                type="button"
                onClick={() => handleClickFilter(data)}
              >
                <h4>{data}</h4>
              </button>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {renderCategory()}
      <div className="flex items-center m-3">
        <SearchBox className="w-full text-base " />
        {renderSortBtn()}
        {renderFilterBtn()}
      </div>
      {!!openFilter && (
        <div>
          <div className="flex items-center justify-between mx-1 mb-1">
            <Select
              options={searchFilterList}
              defaultValue={1}
              className="p-1 w-[7rem]"
              onChange={handleSelectFilter}
            />
            <Checkbox
              value={filter.isEnd}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  isEnd: e.target.checked,
                });
              }}
            >
              {'종료된 이벤트'}
            </Checkbox>
          </div>
          {renderFilterList()}
        </div>
      )}
      {selectCategory !== MainCategory.CALENDER && <EventList />}
      {selectCategory === MainCategory.CALENDER && <Calendar />}
    </div>
  );
};
