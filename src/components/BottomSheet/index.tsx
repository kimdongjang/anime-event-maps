import { MainCategory } from '@/constants/enums';
import { useSearchData } from '@/hooks/useSearchData';
import { selectCategoryStore } from '@/stores/MapDataStore';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { MdHome, MdOutlineStar } from 'react-icons/md';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { useRecoilState } from 'recoil';
import { EventList } from '../Event/List';

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
  const ref = useRef<SheetRef>();

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
          <p>메인</p>
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
          <p>북마크</p>
        </button>
      </div>
    );
  };

  return (
    <>
      {/* 모바일용 바텀 시트 */}
      <Sheet isOpen={isOpen} onClose={() => setOpen(false)}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Sheet.Scroller>
              <div className="h-[600px]">
                {renderCategory()}
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
