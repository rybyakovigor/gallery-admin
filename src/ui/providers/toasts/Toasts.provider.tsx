import { createContext, RefObject, useRef } from 'react';

import { Toast } from 'primereact/toast';

interface Props {
  children: React.ReactNode;
}

export const ToastsContext = createContext<RefObject<Toast | null> | null>(null);

export const ToastsProvider = ({ children }: Props): React.ReactElement => {
  const toast = useRef<Toast>(null);
  return (
    <ToastsContext.Provider value={toast}>
      <Toast ref={toast} />
      {children}
    </ToastsContext.Provider>
  );
};
