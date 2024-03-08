// Core
import { RouterProvider } from 'react-router-dom';

// Router
import { router } from './navigation/router';

// Styles
import './styles/index.css';

function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
