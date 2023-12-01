import { Input, Space } from 'antd';

interface ISearchBox {
  className?: string;
}
export const SearchBox = (props: ISearchBox) => {
  const { className } = props;
  return (
    <Input placeholder="search text" allowClear className={`${className}`} />
  );
};
