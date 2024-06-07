import React, { useState } from 'react';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminTable from '@/components/Admin/Table';
import { QueryResultRow } from '@vercel/postgres';
import { IEvent } from '@/services/event/@types';
import AdminLayout from '@/layout/AdminLayout';
import { formatYmd } from '@/utils/date';
import useSWR from 'swr';
import { useRecoilState } from 'recoil';
import { adminManageStore } from '@/stores/AdminManageStore';

const { Header, Content, Footer, Sider } = Layout;
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home = () => {
    const router = useRouter()

    // 세션을 통해 로그인 여부를 확인
    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession()
            if (!session || (session && new Date() > new Date(session.expires))) {
                router.push('/admin/login') // 세션이 만료되었거나 없는 경우 로그인 페이지로 이동
            }
        }
        checkSession();
    }, []);

    const { data, error } = useSWR<any[]>('/api/event/getEventList', fetcher);
    if (error) return <div>Failed to load: {error.message}</div>;

    return (
        <AdminLayout>
            <div className='bg-gray-200 border-2 rounded-md m-2'>

                <AdminTable title={'조회'} list={!data ? [] : data.map(event => {
                    // 각 row를 event 타입으로 변환하여 반환
                    return {
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
                        startDate: formatYmd(new Date(event.start_date)),
                        endDate: formatYmd(new Date(event.end_date)),
                        title: event.title,
                        priceList: [
                        ],
                        site: event.site,
                        // 이하 필드들 추가
                    };
                })} />
            </div>

        </AdminLayout>
    );
};

export default Home;
