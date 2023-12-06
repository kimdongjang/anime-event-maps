import { MainCategory } from '@/constants/enums';
import { sortMenuItems } from '@/constants/menuItems';
import { useSearchData } from '@/hooks/useSearchData';
import { searchListStore, selectCategoryStore } from '@/stores/MapDataStore';
import { Dropdown } from 'antd';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';
import { MdFilterAlt, MdHome, MdOutlineStar } from 'react-icons/md';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { useRecoilState } from 'recoil';
import { EventList } from '../Event/List';
import { SearchBox } from '../SearchBox';

interface IBottomSheetProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

/**
 * https://github.com/Temzasse/react-modal-sheet
 * @param props
 * @returns
 */
export const BottomSheet = (props: IBottomSheetProps) => {
  const { isOpen, setOpen } = props;
  const [selectCategory, setSelectCategory] =
    useRecoilState(selectCategoryStore);
  const [searchList, setSearchList] = useRecoilState(searchListStore);
  const ref = useRef<SheetRef>();
  const [openFilter, setOpenFilter] = useState(false);

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
    <>
      {/* 모바일용 바텀 시트 */}
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Sheet.Scroller>
              <div className="flex flex-col bg-white ">
                {renderCategory()}
                <div className="flex items-center m-3">
                  <SearchBox className="w-full text-base " />
                  {renderSortBtn()}
                  {renderFilterBtn()}
                </div>
                {renderFilterList()}
                <EventList />
              </div>
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
