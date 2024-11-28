import { useLocalObservable } from 'mobx-react-lite';
import { createContext, FC, PropsWithChildren, useContext } from 'react';

import OrderStore from './OrderStore';

const OrderStoreContext = createContext<OrderStore | null>(null);

export const OrderStoreContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const orderStore = useLocalObservable(() => new OrderStore());

  return (
    <OrderStoreContext.Provider value={orderStore}>
      {children}
    </OrderStoreContext.Provider>
  );
};

export const useOrderStore = () => {
  const context = useContext(OrderStoreContext);

  if (!context) {
    throw new Error('OrderStoreContext was not provided');
  }

  return context;
};