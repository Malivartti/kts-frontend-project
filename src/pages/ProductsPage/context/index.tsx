import ProductsStore from '@shared/stores/ProductsStore';
import { useLocalObservable } from 'mobx-react-lite';
import { createContext, FC, PropsWithChildren, useContext, useEffect } from 'react';

const ProductsStoreContext = createContext<ProductsStore | null>(null);

export const ProductsStoreContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const productsStore = useLocalObservable(() => new ProductsStore());

  useEffect(() => {
    productsStore.getProducts();
    productsStore.getCategoryes()
      .then(() => {
        productsStore.getDataOfQueryParams();
      });

  }, [productsStore]);

  return (
    <ProductsStoreContext.Provider value={productsStore}>
      {children}
    </ProductsStoreContext.Provider>
  );
};

export const useProductsStore = () => {
  const context = useContext(ProductsStoreContext);

  if (!context) {
    throw new Error('ProductsStoreContext was not provided');
  }

  return context;
};