import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from './Sidebar.module.scss';
import { SearchForm } from '../SearchForm';

interface ISidebar {
  handleShow: any;
  isShow: boolean;
  className?: string;
}
const Sidebar = (props: ISidebar) => {
  const { className, handleShow, isShow } = props;

  const renderOpenBtn = () => {
    if (isShow) {
      return (
        <button
          className="bg-indigo-50 hover:bg-blue-100 h-full w-10 border"
          onClick={() => handleShow(false)}
        >
          <ChevronRightIcon />
        </button>
      );
    } else {
      return (
        <button
          className="bg-indigo-50 hover:bg-blue-100 h-full w-10 border"
          onClick={() => handleShow(true)}
        >
          <ChevronLeftIcon />
        </button>
      );
    }
  };

  return (
    <aside className={`fixed flex h-full ${className}`}>
      <div
        className={`bg-white h-full w-0 md:w-[45%] lg:w-[40%] xl:w-[35%] flex overflow-y-scroll ${isShow ? styles.show_side_bar : styles.close_side_bar
          }`}
      >
        <div className="sticky top-0">{renderOpenBtn()}</div>
        <SearchForm />
      </div>
    </aside>
  );
};

export default Sidebar;
