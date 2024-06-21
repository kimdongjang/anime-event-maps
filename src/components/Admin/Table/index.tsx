import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { IEvent } from '@/services/event/@types';
import { useRouter } from 'next/router';

interface IAdminTableProps {
  list: IEvent[];
  title: string;
}
const AdminTable = (props: IAdminTableProps) => {
  const {list, title} = props;
  const router = useRouter();

  const columns: TableProps<IEvent>['columns'] = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '타이틀',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '카테고리',
      key: 'category',
      dataIndex: 'category',
    },
    {
      title: '이벤트 이름',
      key: 'eventName',
      dataIndex: 'eventName',
    },
    {
      title: '시작날짜',
      key: 'startDate',
      dataIndex: 'startDate',
    },
    {
      title: '종료날짜',
      key: 'endDate',
      dataIndex: 'endDate',
    },
    {
      title: '행사장',
      key: 'eventHall',
      dataIndex: 'eventHall',
    },
    {
      title: '도로명 주소',
      key: 'doroAddress',
      dataIndex: 'doroAddress',
    },
    {
      title: '지번 주소',
      key: 'jibunAddress',
      dataIndex: 'jibunAddress',
    },
    {
      title: '위도(lat)',
      key: 'lat',
      dataIndex: 'lat',
    },
    {
      title: '경도(lng)',
      key: 'lng',
      dataIndex: 'lng',
    },
    {
      title: 'website',
      key: 'site',
      dataIndex: 'site',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => {
            router.push(`/admin/update?id=${record.id}`)
          }}>Update </Button>
          <a>Delete</a>
        </Space>
      ),
    },
  ];


  return <>
    <div className='font-bold m-3'>
      {title}
    </div>
    <Table columns={columns} dataSource={props.list} />
  </>
}

export default AdminTable;