import { searchFilterList } from '@/constants/common';
import { FilterType, MainCategory } from '@/constants/enums';
import { sortMenuItems } from '@/constants/menuItems';
import {
  searchedListStore,
  eventListStore,
  selectServiceStore,
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
    useRecoilState(selectServiceStore);
  const [searchEventList, setSearchEventList] = useRecoilState(searchedListStore);
  const [isSummary, setIsSummary] = useRecoilState(isSummaryStore);
  const [openFilter, setOpenFilter] = useState(true);
  const [displayFilterList, setDisplayFilterList] = useState<string[]>([]);
  

  const handleSelectFilter = (value: number) => {
    setSearchEventList({ searchedList: [], addedFilter:[], type: value, isEnd: searchEventList.isEnd });
  };

  /**
   * 필터를 클릭한 경우, 검색하는 필터 리스트에 추가해둔다.
   * @param name 
   * @returns 
   */
  const handleClickDisplayFilter = (name: string) => {
    let filterList = [...searchEventList.addedFilter];
    let idx = filterList.findIndex((data) => data === name);
    // 디스플레이된 필터 토글기능
    // 못찾았으면 필터에 추가
    if (idx < 0) {
      filterList.push(name);
    }
    // 찾았으면 삭제
    else {
      filterList.splice(idx, 1);
    }

    let searchedList = [];
    console.log('filterList',filterList)
    
    if (filterList.length === 0) {
      searchedList = eventList;
    } else {
      switch (searchEventList.type) {
        case FilterType.EVENT:
          searchedList = eventList.filter((event) => {
            // 필터에 추가된 이름들과 일치한다면
            if (!!filterList.find((f) => f === event.eventName)) {
              return event;
            }
          });
          break;
        case FilterType.ADDRESS:
          searchedList = eventList.filter((event) => {
            // 필터에 추가된 이름들과 일치한다면
            if (!!filterList.find((f) => event.doroAddress.includes(f))) {
              return event;
            }
          });
          break;

        case FilterType.LOCATION:
          searchedList = eventList.filter((event) => {
            // 필터에 추가된 이름들과 일치한다면
            if (!!filterList.find((f) => f === event.eventHall)) {
              return event;
            }
          });
          break;
        default:
          searchedList = eventList;
          break;
      }
    }
    console.log('searchedList',searchedList)
    
    setSearchEventList({
      type: searchEventList.type,
      searchedList: searchedList,
      addedFilter: filterList,
      isEnd: searchEventList.isEnd,
    });
  };

  /**
   * handleSelectFilter로 인해 콤보박스 필터 변경시
   */
  useEffect(() => {
    switch (searchEventList.type) {
      case FilterType.EVENT:
        setDisplayFilterList([...new Set(eventList.map((data) => data.eventName))]);
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
          let finder = searchEventList.addedFilter.find((data) => data === name);;
          
          if (!!finder) {
            return (
              <button
                key={i}
                className="flex items-center
                 bg-blue-400 border border-blue-400
              text-white space-x-1 px-2 py-1 my-1 rounded-xl"
                type="button"
                onClick={() => handleClickDisplayFilter(name)}
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
                onClick={() => handleClickDisplayFilter(name)}
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
