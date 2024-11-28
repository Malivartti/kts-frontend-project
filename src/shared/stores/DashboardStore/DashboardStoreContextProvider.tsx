import { useLocalObservable } from 'mobx-react-lite';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

import DashboardStore from './DashboardStore';

const DashboardStoreContext = createContext<DashboardStore | null>(null);

export const DashboardStoreContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const dashboardStore = useLocalObservable(() => new DashboardStore());

  return (
    <DashboardStoreContext.Provider value={dashboardStore}>
      {children}
    </DashboardStoreContext.Provider>
  );
};

export const useDashboardStore = () => {
  const context = useContext(DashboardStoreContext);

  if (!context) {
    throw new Error('DashboardStoreContext was not provided');
  }

  return context;
};