import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
import { SearchForm } from '../SearchForm';

import styles from './BottomSheet.module.scss';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { isOpen, setOpen } = props;
  const ref = useRef<SheetRef>();
  

  useEffect(() => {
    const handlePopState = () => {
      if (isOpen) {
        setOpen(false); // 모달을 닫음
        window.history.pushState(null, '', window.location.href); // 상태를 복구
      } else {
        router.back(); // 모달이 닫혀있을 경우 페이지 뒤로가기
      }
    };

    if (isOpen) {
      // 모달이 열려있을 때 상태 추가
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      // 모달이 닫힐 때 이벤트 제거
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isOpen, setOpen, router]);


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
