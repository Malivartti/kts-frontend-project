import { RouteProps } from 'react-router-dom';

import AboutUsPage from '@/App/pages/AboutUsPage';
import CategoriesPage from '@/App/pages/CategoriesPage';
import MainPage from '@/App/pages/MainPage';
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
    element: <MainPage />
  },
  {
    path: AppRoutes.PRODUCTS,
    element: <ProductsPage />
  },
  {
    path: AppRoutes.PRODUCT,
    element: <ProductPage />
  },
  {
    path: AppRoutes.CATEGORIES,
    element: <CategoriesPage />
  },
  {
    path: AppRoutes.ABOUT_US,
    element: <AboutUsPage />
  },
  {
    path: AppRoutes.NOT_FOUND,
    element: <NotFoundPage />
  }
];