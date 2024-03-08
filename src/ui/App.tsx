// Core
import { RouterProvider } from 'react-router-dom';

// Router
import { router } from './navigation/router';

function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
