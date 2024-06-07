
import { useEffect, useState } from 'react';
import EventForm from '../../components/Admin/Form/EventForm';
import AddCategory from '../../components/Admin/Form/AddCategory';
import { useRecoilState } from 'recoil';
import { adminManageStore } from '@/stores/AdminManageStore';
import AdminLayout from '@/layout/AdminLayout';
import { useRouter } from 'next/router';

const UpdatePage = () => {
  const router = useRouter()
  const { id } = router.query;

  return (
    <AdminLayout>
      <div className='bg-gray-200 border-2 rounded-md m-2'>
        <EventForm mode='update' id={id} />
      </div>
    </AdminLayout>
  )
}

export default UpdatePage;