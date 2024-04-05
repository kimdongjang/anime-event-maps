import { IEvent } from '@/services/event/@types';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};


const AdminForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };
  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        form={form} 
        onFinish={onFinish}
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
            <Select.Option value="demo">Demo</Select.Option>
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
          <Upload action="/upload.do" listType="picture-card">
            <button style={{ border: 0, background: 'none' }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4}} shouldUpdate>
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

export default AdminForm;