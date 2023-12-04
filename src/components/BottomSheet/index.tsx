import { Dispatch, SetStateAction, useRef, useState } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';
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
  const ref = useRef<SheetRef>();

  return (
    <>
      {/* 모바일용 바텀 시트 */}
      <Sheet
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        snapPoints={[600, 400, 100, 0]}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Sheet.Scroller>
              <div className="h-[600px]">
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
