import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  BorderOutlined,
  FileImageOutlined,
  HddOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';

import { Page } from '../../navigation/pages';

import styles from './styles.module.css';

const { Header, Sider, Content } = Layout;

const MainLayout = (): React.ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <Sider collapsible collapsed={collapsed} trigger={null}>
        <Menu
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: Page.WORKS,
              icon: <FileImageOutlined />,
              label: 'Работы',
              onClick: () => {
                navigation(Page.WORKS);
              },
            },
            {
              key: Page.MATERIALS,
              icon: <HddOutlined />,
              label: 'Материалы',
              onClick: () => {
                navigation(Page.MATERIALS);
              },
            },
            {
              key: Page.FRAMING_TYPES,
              icon: <BorderOutlined />,
              label: 'Оформление',
              onClick: () => {
                navigation(Page.FRAMING_TYPES);
              },
            },
            {
              key: Page.FEEDBACK,
              icon: <MailOutlined />,
              label: 'Обратная связь',
              onClick: () => {
                navigation(Page.FEEDBACK);
              },
            },
          ]}
          mode="inline"
          theme="dark"
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button
            className={styles['menu-button']}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            type="text"
            onClick={() => setCollapsed(!collapsed)}
          />
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
