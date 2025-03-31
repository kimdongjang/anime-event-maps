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
    return (
      <button
        className="relative top-1/2 bg-indigo-50 hover:bg-blue-100 w-12 h-12 rounded-full 
                 shadow-md border flex items-center justify-center 
                 transition-transform duration-200"
        onClick={() => handleShow(!isShow)}
      >
        {isShow ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </button>
    );
  };


  return (
    <aside className={`fixed flex h-full ${className}`}>
      <div
        className={`h-full w-0 md:w-[50%] lg:w-[50%] xl:w-[40%] flex overflow-y-scroll ${isShow ? styles.show_side_bar : styles.close_side_bar
          }`}
      >
        <div className="sticky top-0">{renderOpenBtn()}</div>
        <SearchForm />
      </div>
    </aside>
  );
};

export default Sidebar;
