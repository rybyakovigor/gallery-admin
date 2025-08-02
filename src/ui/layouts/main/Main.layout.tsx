import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { MenuItem } from 'primereact/menuitem';
import { classNames } from 'primereact/utils';

import { PageRoute } from '../../navigation/pages';

import Menu from './Menu/Menu';

import styles from './styles.module.css';

const MainLayout = (): React.ReactElement => {
  const navigation = useNavigate();
  const location = useLocation();

  return (
    <div className={styles['main-container']}>
      <aside className={styles['sidebar']}>
        <Menu
          items={[PageRoute.WORKS, PageRoute.MATERIALS, PageRoute.FRAMING_TYPES, PageRoute.FEEDBACK].map((route) => {
            let menuItem: MenuItem = {};
            switch (route) {
              case PageRoute.WORKS:
                menuItem.icon = 'pi pi-images';
                menuItem.label = 'Работы';
                break;
              case PageRoute.MATERIALS:
                menuItem.icon = 'pi pi-palette';
                menuItem.label = 'Материалы';
                break;
              case PageRoute.FRAMING_TYPES:
                menuItem.icon = 'pi pi-th-large';
                menuItem.label = 'Оформление';
                break;
              case PageRoute.FEEDBACK:
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
      </aside>
      <main className={styles['content']}>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
