import { Navigate, RouteProps } from 'react-router-dom';

import AboutUsPage from '@/App/pages/AboutUsPage';
import CategoriesPage from '@/App/pages/CategoriesPage';
import NotFoundPage from '@/App/pages/NotFoundPage';
import ProductPage from '@/App/pages/ProductPage';
import ProductsPage from '@/App/pages/ProductsPage';

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
    element: <ProductsPage />,
  },
  {
    path: AppRoutes.PRODUCT,
    element: <ProductPage />,
  },
  {
    path: AppRoutes.CATEGORIES,
    element: <CategoriesPage />,
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
  categories: {
    mask: AppRoutes.CATEGORIES,
    create: () => AppRoutes.CATEGORIES,
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