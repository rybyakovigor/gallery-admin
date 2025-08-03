import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProtectedRoute from '../common/components/protected-route/ProtectedRoute';
import UnprotectedRoute from '../common/components/unprotected-route/UnprotectedRoute';
import MainLayout from '../layouts/main/Main.layout';
import Auth from '../pages/auth/Auth';
import Feedback from '../pages/feedback/Feedback';
import FramingTypes from '../pages/framing-types/FramingTypes.page';
import MaterialsPage from '../pages/materials/Materials.page';
import Works from '../pages/works/Works';

import { PageRoute } from './pages';

export const router = createBrowserRouter([
  {
    path: PageRoute.AUTH,
    element: (
      <UnprotectedRoute>
        <Auth />
      </UnprotectedRoute>
    ),
  },
  {
    path: PageRoute.ROOT,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate replace to={PageRoute.WORKS} />,
      },
      {
        path: PageRoute.WORKS,
        element: <Works />,
      },
      {
        path: PageRoute.MATERIALS,
        element: <MaterialsPage />,
      },
      {
        path: PageRoute.FRAMING_TYPES,
        element: <FramingTypes />,
      },
      {
        path: PageRoute.FEEDBACK,
        element: <Feedback />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to={PageRoute.WORKS} />,
  },
]);
