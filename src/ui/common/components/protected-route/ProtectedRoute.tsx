// Core
import { observer } from 'mobx-react-lite';
import { Navigate, Outlet } from 'react-router-dom';

// Stores
import authStore from '~/domain/auth/auth.store';

// Types
import { Page } from '~/ui/navigation/pages';

interface PropsType {
  children?: React.ReactNode;
}
const ProtectedRoute = ({ children }: PropsType): React.ReactNode => {
  const { isAuth } = authStore;
  if (!isAuth) {
    return <Navigate to={Page.AUTH} replace />;
  }

  return children ? children : <Outlet />;
};

export default observer(ProtectedRoute);
