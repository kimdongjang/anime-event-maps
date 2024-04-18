import { searchFilterList } from '@/constants/common';
import { FilterType, MainCategory } from '@/constants/enums';
import { sortMenuItems } from '@/constants/menuItems';
import {
  searchListStore,
  eventListStore,
  selectCategoryStore,
  isSummaryStore,
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
import { IEvent } from '@/services/event/@types';

export const SearchForm = () => {
  const [eventList, setEventList] = useRecoilState(eventListStore);
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const [searchEventList, setSearchEventList] = useRecoilState(searchListStore);
  const [isSummary, setIsSummary] = useRecoilState(isSummaryStore);
  const [openFilter, setOpenFilter] = useState(true);
  const [displayFilterList, setDisplayFilterList] = useState<string[]>([]);
  
  console.log('searchFilter', searchEventList)

  const handleSelectFilter = (value: number) => {
    setSearchEventList({ addedEventList: [], type: value, isEnd: searchEventList.isEnd });
  };

  const handleClickDisplayFilter = (data?: IEvent) => {
    if(!data) return;
    let tempList = [...searchEventList.addedEventList];
    let idx = -1;
    switch (searchEventList.type) {
      case FilterType.EVENT:
        idx = tempList.findIndex((event) => event.event === data?.event);
        break;
      case FilterType.LOCATION:
        idx = tempList.findIndex((event) => event.eventHall === data?.eventHall);
        break;
      case FilterType.ADDRESS:
        idx = tempList.findIndex((event) => event.doroAddress.includes(data?.doroAddress));
        break;
    }
    // 디스플레이된 필터 토글기능
    // 못찾았으면 필터에 추가
    if (idx < 0) {
      tempList.push(data);
    }
    // 찾았으면 삭제
    else {
      tempList.splice(idx, 1);
    }
    setSearchEventList({
      type: searchEventList.type,
      addedEventList: tempList,
      isEnd: searchEventList.isEnd,
    });
  };

  /**
   * handleSelectFilter로 인해 콤보박스 필터 변경시
   */
  useEffect(() => {
    switch (searchEventList.type) {
      case FilterType.EVENT:
        setDisplayFilterList([...new Set(eventList.map((data) => data.event))]);
        break;
      case FilterType.LOCATION:
        setDisplayFilterList([...new Set(eventList.map((data) => data.eventHall))]);
        break;
      case FilterType.ADDRESS:
        setDisplayFilterList([
          ...new Set(
            eventList.map(
              (data) =>
                data.doroAddress?.split(' ')[0] +
                ' ' +
                data.doroAddress?.split(' ')[1]
            )
          ),
        ]);
        break;
    }
  }, [searchEventList, eventList]);

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
        {[...displayFilterList].map((name, i) => {
          let finder:IEvent|undefined;
          switch (searchEventList.type) {
            case FilterType.EVENT:
              finder = searchEventList.addedEventList.find((event) => event.event === name);
              break;
            case FilterType.LOCATION:
              finder = searchEventList.addedEventList.find((event) => event.eventHall === name);
              break;
            case FilterType.ADDRESS:
              finder = searchEventList.addedEventList.find((event) => event.doroAddress.includes(name));
              break;
          }
          if (!!finder) {
            return (
              <button
                key={i}
                className="flex items-center
                 bg-blue-400 border border-blue-400
              text-white space-x-1 px-2 py-1 my-1 rounded-xl"
                type="button"
                onClick={() => handleClickDisplayFilter(finder)}
              >
                <MdCheck />
                <h4>{name}</h4>
              </button>
            );
          } else {
            return (
              <button
                key={i}
                className="border px-2 py-1 my-1 rounded-xl"
                type="button"
                onClick={() => handleClickDisplayFilter(finder)}
              >
                <h4>{name}</h4>
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
            <div>
              <Checkbox
                value={isSummary}
                onChange={(e) => {
                  setIsSummary(e.target.checked);
                }}
              >
                {'요약해서 보기'}
              </Checkbox>
              <Checkbox
                value={searchEventList.isEnd}
                onChange={(e) => {
                  setSearchEventList({
                    ...searchEventList,
                    isEnd: e.target.checked,
                  });
                }}
              >
                {'종료된 이벤트'}
              </Checkbox>
            </div>
          </div>
          {renderFilterList()}
        </div>
      )}
      {selectCategory !== MainCategory.CALENDER && <EventList />}
      {selectCategory === MainCategory.CALENDER && <Calendar />}
    </div>
  );
};
