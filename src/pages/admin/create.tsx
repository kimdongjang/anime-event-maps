
import { useEffect, useState } from 'react';
import EventForm from '../../components/Admin/Form/EventForm';
import AddCategory from '../../components/Admin/Form/AddCategory';
import { useRecoilState } from 'recoil';
import { adminManageStore } from '@/stores/AdminManageStore';
import AdminLayout from '@/layout/AdminLayout';
import AddEventTemplate from '@/components/Admin/Form/AddEventTemplate';
import AddEventHallTemplate from '@/components/Admin/Form/AddEventHallTemplate';

const AddPage = () => {
  return (
    <AdminLayout>
    <div className='grid '>
      <div className='bg-gray-200 border-2 rounded-md m-2'>
        <EventForm mode='create'/>
      </div>
      <div className='bg-gray-200 border-2 rounded-md m-2'>
        <AddCategory mode={'category'} />
      </div>
      <div className='bg-gray-200 border-2 rounded-md m-2'>
        <AddEventTemplate  />
      </div>
      <div className='bg-gray-200 border-2 rounded-md m-2'>
        <AddEventHallTemplate  />
      </div>
    </div>
    </AdminLayout>
  )
}

export default AddPage;