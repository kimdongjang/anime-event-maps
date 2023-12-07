import { Dispatch, SetStateAction, useRef, useState } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { SearchForm } from '../SearchForm';

import styles from './BottomSheet.module.scss';

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
  const ref = useRef<SheetRef>();

  return (
    <>
      {/* 모바일용 바텀 시트 */}
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        className={styles.sheet}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Sheet.Scroller>
              <SearchForm />
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};
