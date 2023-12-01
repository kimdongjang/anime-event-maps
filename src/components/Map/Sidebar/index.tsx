export { }
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import { useEffect, useState } from 'react';
// import { IconButton } from '@mui/material';

// import styles from './Sidebar.module.scss';

// interface ISidebar {
//   className?: string;
// }
// const Sidebar = (props: ISidebar) => {
//   const { className } = props;
//   const [isShow, setIsShow] = useState(false);
//   const renderBtn = () => {
//     if (isShow) {
//       return (
//         <IconButton className="rounded" onClick={() => setIsShow(false)}>
//           <ChevronRightIcon />
//         </IconButton>
//       );
//     } else {
//       return (
//         <IconButton className="rounded" onClick={() => setIsShow(true)}>
//           <ChevronLeftIcon />
//         </IconButton>
//       );
//     }
//   };
//   return (
//     <aside className={`absolute flex flex-row-reverse right-0 h-full w-[30%]`}>
//       <div
//         className={`bg-gray-100 h-full ${isShow ? styles.show_side_bar : styles.close_side_bar
//           }`}
//       ></div>
//       {renderBtn()}
//     </aside>
//   );
// };

// export default Sidebar;
