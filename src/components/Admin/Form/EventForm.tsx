
import { useGetEventListById } from '@/hooks/event/useEventApi';
import { useGetImageById } from '@/hooks/image/useImageApi';
import { insertEventList, updateEvent } from '@/services/event';
import { IEvent } from '@/services/event/@types';
import { insertImage } from '@/services/image';
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

interface IEventFormProps {
  mode: 'create' | 'update';
  id?: string | string[];
}
const EventForm = (props: IEventFormProps) => {
  const { mode, id } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [blob, setBlob] = useState<PutBlobResult>();
  const [adminManage, setAdminManage] = useRecoilState(adminManageStore);
  const [title, setTitle] = useState('');

  const image = useGetImageById(Number(id));
  const event = useGetEventListById(Number(id));
  console.log(event)

  useEffect(() => {
    if (!!image)
      setImageUrl(image.path)
  }, [image])


  useEffect(() => {
    switch (mode) {
      case 'create':
        setTitle('이벤트 등록');
        break;
      case 'update':
        setTitle('이벤트 수정');
        break;
      default:
        break;
    }
  }, [mode])

  const onFinish = async (values: IEvent) => {
    switch (mode) {
      case 'create':
        handleInsert(values)
        break;
      case 'update':
        handleUpdate(values);
        break;
      default:
        break;
    }

  };
  const handleInsert = async (values: Omit<IEvent, 'id'>) => {
    const eventId = await insertEventList({
      address: '',
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
    });

    if (!!blob) {
      await insertImage({
        alt: '',
        path: blob?.url,
        eventId: eventId,
      })
    }
    console.log('Finish:', eventId);
  }
  const handleUpdate = async (values: IEvent) => {
    const result = await updateEvent({
      id: Number(id),
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
    });
    if (!!blob) {
      await insertImage({
        alt: '',
        path: blob?.url,
        eventId: Number(id),
      })
    }
    console.log('Finish:', result);
  }

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
      <div className='font-bold m-3'>
        {title}
      </div>
      <Form
        labelCol={{ span: 3 }}
        layout="horizontal"
        form={form}
        onFinish={onFinish}
        initialValues={!event ? {} : {
          id: event.id,
          address: event.address,
          category: event.category,
          doroAddress: event.doro_address,
          eventName: event.event_name,
          eventHall: event.event_hall,
          images: {
            path: '',
            alt: '',
          },
          isFavorite: event.isFavorite,
          jibunAddress: event.jibun_address,
          lat: event.lat,
          lng: event.lng,
          startDate: dayjs(formatYmd(new Date(event.start_date))),
          endDate: dayjs(formatYmd(new Date(event.end_date))),
          title: event.title,
          priceList: [
          ],
          site: event.site,
          // 이하 필드들 추가
        }}
      >
        <Form.Item label="타이틀 이름" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="이벤트 이름" name="eventName">
          <Input />
        </Form.Item>
        <Form.Item label="행사장" name="eventHall">
          <Input />
        </Form.Item>
        <Form.Item label="카테고리 선택" name="category">
          <Select>
            {adminManage.categoryList.map((data,i )=> {
              return <Select.Option key={i} value={data.name}>{data.name}</Select.Option>
            })}
          </Select>
        </Form.Item>
        <Form.Item label="사이트 주소" name="site">
          <Input />
        </Form.Item>
        <Form.Item label="날짜" name="date">
          <RangePicker />
        </Form.Item>
        <Form.Item label="도로명 주소" name="doroAddress">
          <Input />
        </Form.Item>
        <Form.Item label="지번 주소" name="jibunAddress">
          <Input />
        </Form.Item>
        <Form.Item label="위도" name="lat">
          <Input />
        </Form.Item>
        <Form.Item label="경도" name="lng">
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
        <Form.Item label="액션" shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
            >
              {title}
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default EventForm;