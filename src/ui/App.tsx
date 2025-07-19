import { RouterProvider } from 'react-router-dom';

import { configure } from 'mobx';

import { router } from './navigation/router';

import './styles/index.css';

// Настройка для mobx, позволяющая не оборачивать
// асинхронные изменения стейта в runInAction
setTimeout(() => {
  configure({
    enforceActions: 'never',
    reactionScheduler: (f) => setTimeout(f),
  });
});

function App(): React.ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
