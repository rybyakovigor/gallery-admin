import { RouterProvider } from 'react-router-dom';

import { configure } from 'mobx';

import { router } from './navigation/router';
import { StylesProvider } from './providers/styles/Styles.provider';
import { ToastsProvider } from './providers/toasts/Toasts.provider';

// Настройка для mobx, позволяющая не оборачивать
// асинхронные изменения стейта в runInAction
setTimeout(() => {
  configure({
    enforceActions: 'never',
    reactionScheduler: (f) => setTimeout(f),
  });
});

function App(): React.ReactElement {
  return (
    <StylesProvider>
      <ToastsProvider>
        <RouterProvider router={router} />
      </ToastsProvider>
    </StylesProvider>
  );
}

export default App;
