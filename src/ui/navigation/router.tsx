// Core
import { Navigate, createBrowserRouter } from 'react-router-dom';

// Pages
import { Page } from './pages';
import Works from '../pages/works/Works';
import Materials from '../pages/materials/Materials';
import FramingTypes from '../pages/framing-types/FramingTypes';

// Layouts
import MainLayout from '../layouts/main/Main.layout';

export const router = createBrowserRouter([
  {
    path: Page.ROOT,
    element: <MainLayout />,
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
    ],
  },
  {
    path: '*',
    element: <Navigate to={Page.WORKS} replace />,
  },
]);
