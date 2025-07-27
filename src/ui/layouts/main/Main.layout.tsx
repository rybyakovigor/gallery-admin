import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';

import { Page } from '../../navigation/pages';

import Menu from './Menu/Menu';

import styles from './styles.module.css';

const MainLayout = (): React.ReactElement => {
  const navigation = useNavigate();
  const location = useLocation();

  return (
    <div className={styles['main-container']}>
      <div className={styles['sidebar']}>
        <Menu
          items={[Page.WORKS, Page.MATERIALS, Page.FRAMING_TYPES, Page.FEEDBACK].map((route) => {
            let menuItem: MenuItem = {};
            switch (route) {
              case Page.WORKS:
                menuItem.icon = 'pi pi-images';
                menuItem.label = 'Работы';
                break;
              case Page.MATERIALS:
                menuItem.icon = 'pi pi-palette';
                menuItem.label = 'Материалы';
                break;
              case Page.FRAMING_TYPES:
                menuItem.icon = 'pi pi-th-large';
                menuItem.label = 'Оформление';
                break;
              case Page.FEEDBACK:
                menuItem.icon = 'pi pi-comment';
                menuItem.label = 'Обратная связь';
                break;
            }

            return {
              ...menuItem,
              className: classNames({ [styles['active-item']]: location.pathname === route }),
              command: () => navigation(route),
            };
          })}
        />
      </div>
      <div className={styles['content']}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
