import { deleteCategory, insertCategory } from '@/services/category';
import { ICategory, IEvent } from '@/services/event/@types';
import { adminManageStore } from '@/stores/AdminManageStore';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { put, PutBlobResult } from '@vercel/blob';
import { QueryResultRow } from '@vercel/postgres';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  GetProp,
  Input,
  InputNumber,
  List,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  UploadProps,
} from 'antd';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

interface IAddCategoryProps {
  mode: string;
}
type TypeList = ICategory[];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddCategory = ({ mode }: IAddCategoryProps) => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState<string>('');
  const [adminManage, setAdminManage] = useRecoilState(adminManageStore);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [blob, setBlob] = useState<PutBlobResult>();

  interface IAddFormProps {
    name: string;
  }

  const onFinish = async (values: IAddFormProps) => {
    const result = await insertCategory({
      name: values.name,
    })
  };


  /**
   * base64 이미지 url로 변경하는 코드
   */
  type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);

  };

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, async (url) => {
        setLoading(false);
        setImageUrl(url);
        setBlob(await put(`images/${info.file.originFileObj?.name}`, info.file.originFileObj, { access: 'public' }));
        console.log(blob);
      });
    }

  }
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );


  return (
    <>
      <div className='font-bold m-3'>자주 쓰는 행사 템플릿</div>
      <Form
        className='m-3'
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="이벤트 이름" name="eventName">
          <Input />
        </Form.Item>
        <Form.Item label="카테고리 선택" name="category">
          <Select>
            {adminManage.categoryList.map((data, i) => {
              return <Select.Option key={i} value={data.name}>{data.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item label="사이트 주소" name="site">
          <Input />
        </Form.Item>
        <Form.Item label="대표 이미지" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload
            onChange={handleChange}
            showUploadList={false}
            listType="picture-card">
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>
      </Form>
    </>
  )
}

export default AddCategory;