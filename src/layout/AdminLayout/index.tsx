import { useRouter } from 'next/router';
import { Layout, Menu, MenuProps } from 'antd';
import Link from 'next/link';
import { UserOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

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
    type MenuItem = Required<MenuProps>['items'][number];
    const menuItems: MenuItem[] = [
        getItem('리스트', 'sub1', <UserOutlined />, [
            getItem('조회', '/admin/home'),
            getItem('추가', '/admin/create'),
        ]),
    ];
    const [selectedBreadcrumb, setSelectedBreadcrumb] = useState<'list' | 'form'>('list'); // 선택된 Breadcrumb 상태

    const handleBreadcrumbClick = (breadcrumb: 'list' | 'form') => {
        setSelectedBreadcrumb(breadcrumb);
    };



    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider>
                <div className="logo" />
                <Menu theme="dark" defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']} mode="inline" items={menuItems} selectedKeys={[router.pathname]}
                    onSelect={(e) => {
                        router.push(e.key);
                    }} />
            </Sider>
            <Layout>
                <Content >
                    <div style={{ background: '#fff', minHeight: 360, margin: '0.5rem' }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design Layout with Next.js</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
