import classNames from 'classnames';
import { MdHome, MdOutlineStar } from 'react-icons/md';

interface IBottomNavigationProps {
  className?: string;
}
export const BottomNavigation = (props: IBottomNavigationProps) => {
  const { className } = props;
  return (
    <div className={classNames(className, 'h-[60px] w-full flex items-center')}>
      <div
        className="w-full h-full flex flex-col justify-center items-center 
        bg-gray-100 border text-gray-700 "
      >
        <MdHome size={30} />
      </div>
      <div
        className="w-full h-full flex flex-col justify-center items-center 
        bg-gray-100 border text-gray-700 "
      >
        <MdOutlineStar size={30} />
      </div>
    </div>
  );
};
