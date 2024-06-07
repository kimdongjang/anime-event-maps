import { deleteCategory, insertCategory } from '@/services/category';
import { ICategory, IEvent } from '@/services/event/@types';
import { adminManageStore } from '@/stores/AdminManageStore';
import { PlusOutlined } from '@ant-design/icons';
import { QueryResultRow } from '@vercel/postgres';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  List,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

interface IAddCategoryProps {
  mode: string;
}
type TypeList = ICategory[];

const AddCategory = ({ mode }: IAddCategoryProps) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState<string>('');
  const [adminManage, setAdminManage] = useRecoilState(adminManageStore);

  interface IAddFormProps {
    name: string;
  }

  const onFinish = async (values: IAddFormProps) => {
    const result = await insertCategory({
      name: values.name,
    })
  };

  const deleteItem = async (id: number) => {
    if (mode === 'category') {
      const result = await deleteCategory({
        id: id
      })
      alert(result);
    }
  }

  return (
    <>
      <div className='font-bold m-3'>카테고리</div>
      <List
        className='bg-white m-3'
        size="small"
        bordered
        dataSource={adminManage.categoryList}
        renderItem={(item,i) => {
          if (mode === 'category') {
            return <List.Item actions={[<a onClick={() => deleteItem(item.id)} key={i}>삭제</a>]} key={item.id}>{item.name}</List.Item>
          }
        }}
      />
      <Form
        className='m-3'
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="입력" name="name"
          rules={[{ required: true, message: 'Please input!' }]}>
          <div className='flex'>
            <Input />
            <Button
              type="primary"
              htmlType="submit"
            >
              추가
            </Button></div>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddCategory;