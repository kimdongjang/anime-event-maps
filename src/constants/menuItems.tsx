import { FaSortAmountDown } from 'react-icons/fa';
import { ISort } from './enums';

export const sortMenuItems = [
  {
    key: ISort.DATE_DOWN,
    label: (
      <button className="flex items-center text-base space-x-1">
        <FaSortAmountDown />
        <p>최근 순서</p>
      </button>
    ),
  },
];
