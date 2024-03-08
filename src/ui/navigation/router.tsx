// Core
import { Navigate, createBrowserRouter } from 'react-router-dom';

// Pages
import { Page } from './pages';

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
        element: <div>Works</div>,
      },
      {
        path: Page.MATERIALS,
        element: <div>Materials</div>,
      },
      {
        path: Page.FRAMING_TYPES,
        element: <div>Framing Types</div>,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={Page.WORKS} replace />,
  },
]);
