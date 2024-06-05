import { insertEventList } from '@/services/event';
import { IEvent } from '@/services/event/@types';
import { adminManageStore } from '@/stores/AdminManageStore';
import { formatYmd } from '@/utils/date';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { PutBlobResult, put } from '@vercel/blob';
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
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import dayjs from 'dayjs';

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const fetcher = (url: string, id?: string) =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  }).then((res) => res.json());

interface IEventFormProps {
  mode: 'create' | 'update';
  id?: string;
}
const EventForm = (props: IEventFormProps) => {
  const { mode, id } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [blob, setBlob] = useState<PutBlobResult>();
  const [adminManage, setAdminManage] = useRecoilState(adminManageStore);

  const { data, error } = useSWR(['/api/event/getEventListById', id], ([url, id]) => fetcher(url, id));

  if (error) return <div>Failed to load: {error.message}</div>;
  if (!data) return <div>Loading...</div>;
  
  useEffect(() => {
    console.log(event)
  },[event])
  

  const onFinish = async (values: Omit<IEvent, 'id'>) => {
    const result = await insertEventList({
      address: values.address,
      category: values.category,
      doroAddress: values.doroAddress,
      eventName: values.eventName,
      eventHall: values.eventHall,
      jibunAddress: values.jibunAddress,
      lat: values.lat,
      lng: values.lng,
      site: values.site,
      isFavorite: values.isFavorite,
      priceList: values.priceList,
      startDate: dayjs(values.startDate).format('YYYY-MM-DD'),
      endDate: dayjs(values.endDate).format('YYYY-MM-DD'),
      title: values.title,
      images: {
        path: blob?.url,
        alt: '',
      }
    });
    console.log('Finish:', result);
  };

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
      <Form
        labelCol={{ span: 6 }}
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        initialValues={data}
      >
        <Form.Item label="타이틀 이름" name="title"
          rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="행사장" name="address"
          rules={[{ required: true, message: 'Please input!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="카테고리 선택" name="category"
          rules={[{ required: true, message: 'Please input!' }]}>
          <Select>
            {adminManage.categoryList.map(data => {
              return <Select.Option value={data.id}>{data.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item label="사이트 주소" name="site">
          <Input />
        </Form.Item>
        <Form.Item label="날짜" name="date"
          rules={[{ required: true, message: 'Please input!' }]}>
          <RangePicker />
        </Form.Item>
        <Form.Item label="도로명 주소" name="doroAddress">
          <Input />
        </Form.Item>
        <Form.Item label="지번 주소" name="jibunAddress">
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
        <Form.Item wrapperCol={{ offset: 4 }} shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
            >
              추가
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default EventForm;