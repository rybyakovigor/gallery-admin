// Core
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  BorderOutlined,
  FileImageOutlined,
  HddOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button } from 'antd';

// Routes
import { Page } from '../../navigation/pages';

import styles from './styles.module.css';

const { Header, Sider, Content } = Layout;

const MainLayout = (): React.ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu
          theme="dark"
          mode="inline"
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
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className={styles['menu-button']}
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
