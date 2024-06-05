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
import Link from 'next/link';
import ViewPage from '@/components/Admin/View/ViewPage';
import AdminLayout from '@/layout/AdminLayout';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
const Home = () => {
    const router = useRouter()    
    const [selectedBreadcrumb, setSelectedBreadcrumb] = useState<'list' | 'form'>('list'); // 선택된 Breadcrumb 상태

    const handleBreadcrumbClick = (breadcrumb: 'list' | 'form') => {
        setSelectedBreadcrumb(breadcrumb);
    };

  
    // 세션을 통해 로그인 여부를 확인
    useEffect(() => {
      const fetchData = async () => {
        const session = await getSession()
        if (!session || (session && new Date() > new Date(session.expires))) {
          router.push('/admin/login') // 세션이 만료되었거나 없는 경우 로그인 페이지로 이동
        }
      }
      fetchData();
    },[]);
    


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <AdminLayout>
            <ViewPage/>
           
        </AdminLayout>
    );
};

export default Home;
