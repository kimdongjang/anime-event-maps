
import { useGetEventListById } from '@/hooks/event/useEventApi';
import { useGetImageById } from '@/hooks/image/useImageApi';
import { insertEventList, updateEvent, updateEventImage } from '@/services/event';
import { IEvent } from '@/services/event/@types';
import { adminManageStore } from '@/stores/AdminManageStore';
import { formatYmd } from '@/utils/date';
import { parseEvent } from '@/utils/parse';
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
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { mode, id } = props;

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [blob, setBlob] = useState<PutBlobResult>();
  const [adminManage, setAdminManage] = useRecoilState(adminManageStore);
  const [title, setTitle] = useState('');

  // const image = useGetImageById(Number(id));
  const getEventApi = useGetEventListById({ id: Number(id) });
  const [event, setEvent] = useState<IEvent>()
  


  useEffect(() => {
    if (getEventApi.isLoading || getEventApi.error) return;
    setEvent(parseEvent(getEventApi.response.content))
    setImageUrl(parseEvent(getEventApi.response.content).titleImage)
    form.setFieldsValue(parseEvent(getEventApi.response.content))
    console.log(getEventApi)
  }, [getEventApi.error, getEventApi.isLoading])

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
  const handleInsert = async (values: any) => {
    if (!!blob) {
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
        startDate: formatYmd(new Date(values.date[0])),
        endDate: formatYmd(new Date(values.date[1])),
        title: values.title,
        titleImage: blob.url
      });

    }
    else {
      if (confirm("이미지 없이 등록하시겠습니까?")) {
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
          startDate: formatYmd(new Date(values.date[0])),
          endDate: formatYmd(new Date(values.date[1])),
          title: values.title,
        });

        alert('등록되었습니다!')
        router.push("/admin/home")
      }
    }

  }
  const handleUpdate = async (values: any) => {
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
      startDate: formatYmd(new Date(values.date[0])),
      endDate: formatYmd(new Date(values.date[1])),
      title: values.title,
    });
    if (!!blob) {
      await updateEventImage(
        Number(id),
        blob.url
      )
    }
    alert('수정되었습니다!')
    router.push("/admin/home")
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
      >
        <Form.Item label="타이틀 이름" name="title">
          <Input />
        </Form.Item>
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
        <Form.Item label="날짜" name="date">
          <RangePicker />
        </Form.Item>        
        <Form.Item label="행사장" name="eventHall">
          <Input />
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