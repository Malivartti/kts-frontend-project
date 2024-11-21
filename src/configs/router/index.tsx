import { Navigate, RouteProps } from 'react-router-dom';

import AboutUsPage from '@/App/pages/AboutUsPage';
import NotFoundPage from '@/App/pages/NotFoundPage';
import ProductPage from '@/App/pages/ProductPage';
import ProductsPage from '@/App/pages/ProductsPage';
import { ProductsStoreContextProvider } from '@/App/pages/ProductsPage/context';

export enum AppRoutes {
  MAIN = '/',
  PRODUCTS = '/products',
  PRODUCT = '/products/:id',
  CATEGORIES = '/categories',
  ABOUT_US = '/about-us',
  NOT_FOUND = '*'
}

export const AppRoutePages: RouteProps[] = [
  {
    path: AppRoutes.MAIN,
    element: <Navigate to={AppRoutes.PRODUCTS} replace={true} />,
  },
  {
    path: AppRoutes.PRODUCTS,
    element: (<ProductsStoreContextProvider>
      <ProductsPage />
    </ProductsStoreContextProvider>) ,
  },
  {
    path: AppRoutes.PRODUCT,
    element: <ProductPage />,
  },
  {
    path: AppRoutes.ABOUT_US,
    element: <AboutUsPage />,
  },
  {
    path: AppRoutes.NOT_FOUND,
    element: <NotFoundPage />,
  }
];

export const AppRouteUrls = {
  root: AppRoutes.MAIN,
  products: {
    mask: AppRoutes.PRODUCTS,
    create: () => AppRoutes.PRODUCTS,
  },
  product: {
    mask: AppRoutes.PRODUCT,
    create: (id: number) => `${AppRoutes.PRODUCTS}/${id}`,
  },
  aboutUs: {
    mask: AppRoutes.ABOUT_US,
    create: () => AppRoutes.ABOUT_US,
  },
  notFound: {
    mask: AppRoutes.NOT_FOUND,
    create: () => AppRoutes.NOT_FOUND,
  },
};