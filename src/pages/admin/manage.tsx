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
import getEventList from "@/api/test"
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminTable from '@/components/Admin/Table';
import { QueryResultRow } from '@vercel/postgres';
import { IEvent } from '@/services/event/@types';
import Link from 'next/link';
import AdminList from '@/components/Admin/View/AdminList';
import AdminForm from '@/components/Admin/View/AdminForm';

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

const items: MenuItem[] = [
    // getItem('Option 1', '1', <PieChartOutlined />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    getItem('리스트', 'sub1', <UserOutlined />, [
        getItem('조회', '1'),
        getItem('추가', '2'),
    ]),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    // getItem('Files', '9', <FileOutlined />),
];

const Manage = () => {
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
          router.push('/admin') // 세션이 만료되었거나 없는 경우 로그인 페이지로 이동
        }
      }
      fetchData();
    },[]);
    


    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']} mode="inline" items={items}
                onSelect={(e) => {
                    switch(e.key){
                        case '1': handleBreadcrumbClick('list'); break;
                        case '2': handleBreadcrumbClick('form'); break;
                        default: handleBreadcrumbClick('list'); break;
                    }
                }} />
            </Sider>
            <Layout>
                {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item >리스트</Breadcrumb.Item>
                        <Breadcrumb.Item >추가</Breadcrumb.Item>
                    </Breadcrumb>
                    
                    {selectedBreadcrumb === 'list' && <AdminList />}
                    {selectedBreadcrumb === 'form' && <AdminForm />}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Manage;
