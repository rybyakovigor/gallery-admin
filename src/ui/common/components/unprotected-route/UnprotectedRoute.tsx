import { Navigate, Outlet } from 'react-router-dom';

import { observer } from 'mobx-react-lite';

import authStore from '~/domain/auth/auth.store';

import { Page } from '~/ui/navigation/pages';

interface PropsType {
  children?: React.ReactElement;
}
const UnprotectedRoute = ({ children }: PropsType): React.ReactElement => {
  const { isAuth } = authStore;
  if (isAuth) {
    return <Navigate replace to={Page.WORKS} />;
  }

  return children ?? <Outlet />;
};

export default observer(UnprotectedRoute);
