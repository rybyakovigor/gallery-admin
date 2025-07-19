import { createBrowserRouter, Navigate } from 'react-router-dom';

import ProtectedRoute from '../common/components/protected-route/ProtectedRoute';
import UnprotectedRoute from '../common/components/unprotected-route/UnprotectedRoute';
// Layouts
import MainLayout from '../layouts/main/Main.layout';
import Auth from '../pages/auth/Auth';
import Feedback from '../pages/feedback/Feedback';
import FramingTypes from '../pages/framing-types/FramingTypes';
import Materials from '../pages/materials/Materials';
import Works from '../pages/works/Works';

import { Page } from './pages';

export const router = createBrowserRouter([
  {
    path: Page.AUTH,
    element: (
      <UnprotectedRoute>
        <Auth />
      </UnprotectedRoute>
    ),
  },
  {
    path: Page.ROOT,
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate replace to={Page.WORKS} />,
      },
      {
        path: Page.WORKS,
        element: <Works />,
      },
      {
        path: Page.MATERIALS,
        element: <Materials />,
      },
      {
        path: Page.FRAMING_TYPES,
        element: <FramingTypes />,
      },
      {
        path: Page.FEEDBACK,
        element: <Feedback />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate replace to={Page.WORKS} />,
  },
]);
