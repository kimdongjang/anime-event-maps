import { insertEventHallTemplate } from '@/services/template';
import { IEventHallTemplate } from '@/services/template/@types';
import { adminManageStore } from '@/stores/AdminManageStore';
import { PutBlobResult } from '@vercel/blob';
import {
  Button,
  Form,
  Input,
} from 'antd';

import { useState } from 'react';
import { useRecoilState } from 'recoil';


const AddEventHallTemplate = () => {
  const [form] = Form.useForm();
  const [title, setTitle] = useState<string>('');
  const [adminManage, setAdminManage] = useRecoilState(adminManageStore);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [blob, setBlob] = useState<PutBlobResult>();


  const onFinish = async (values: IEventHallTemplate) => {
      const result = await insertEventHallTemplate({
        hallName: values.hallName,
        roadAddress: values.roadAddress,
        jibunAddress: values.jibunAddress,
        latitude: values.latitude,
        longitude: values.longitude
      })
      if(result){
        alert("등록이 완료되었습니다.")
      }
  };

  return (
    <>
      <div className='font-bold m-3'>행사장 위치 템플릿</div>
      <Form
        labelCol={{ span: 3 }}
        className='m-3'
        layout="horizontal"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="행사장 이름" name="hallName">
          <Input />
        </Form.Item>
        <Form.Item label="도로명 주소" name="roadAddress">
          <Input />
        </Form.Item>
        <Form.Item label="지번 주소" name="jibunAddress">
          <Input />
        </Form.Item>
        <Form.Item label="위도" name="latitude">
          <Input />
        </Form.Item>
        <Form.Item label="경도" name="longitude">
          <Input />
        </Form.Item>
        <Form.Item label="등록" shouldUpdate>
          {() => (
            <Button type="primary" htmlType="submit">
              {"등록"}
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  )
}

export default AddEventHallTemplate;