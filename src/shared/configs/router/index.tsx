
import { Role } from '@entities/User';
import AboutUsPage from '@pages/AboutUsPage';
import DashboardPage from '@pages/DashboardPage/DashboardPage';
import LoginPage from '@pages/LoginPage';
import NotFoundPage from '@pages/NotFoundPage';
import OrderPage from '@pages/OrderPage/ui/OrderPage';
import ProductPage from '@pages/ProductPage';
import ProductsPage from '@pages/ProductsPage';
import ProfilePage from '@pages/ProfilePage';
import RegisterPage from '@pages/RegisterPage';
import StatisticsPage from '@pages/StatisticsPage/ui/StatisticsPage';
import { OrderStoreContextProvider } from '@shared/stores/OrderStore';
import { ProductsStoreContextProvider } from '@shared/stores/ProductsStore';
import rootStore from '@shared/stores/RootStore';
import { Navigate, RouteProps } from 'react-router-dom';

export enum AppRoutes {
  MAIN = '/',
  PRODUCTS = '/products',
  PRODUCT = '/products/:id',
  CATEGORIES = '/categories',
  ABOUT_US = '/about-us',
  LOGIN = '/login',
  REGISTER = '/register',
  PROFILE = '/profile',
  ORDER = '/order',
  STATISTICS = '/statistics',
  DASHBOARD = '/dashboard',
  NOT_FOUND = '*'
}

type TAppRoutePages = RouteProps & {
  roles: Role[]
}

export const AppRoutePages: TAppRoutePages[] = [
  {
    path: AppRoutes.MAIN,
    element: <Navigate to={AppRoutes.PRODUCTS} replace={true} />,
    roles: [Role.guest, Role.customer],
  },
  {
    path: AppRoutes.MAIN,
    element: <Navigate to={AppRoutes.STATISTICS} replace={true} />,
    roles: [Role.admin],
  },
  {
    path: AppRoutes.PRODUCTS,
    element: (
      <ProductsStoreContextProvider>
        <ProductsPage />
      </ProductsStoreContextProvider>
    ),
    roles: [Role.guest, Role.customer],
  },
  {
    path: AppRoutes.PRODUCT,
    element: <ProductPage />,
    roles: [Role.guest, Role.customer],
  },
  {
    path: AppRoutes.ABOUT_US,
    element: <AboutUsPage />,
    roles: [Role.guest, Role.customer],
  },
  {
    path: AppRoutes.LOGIN,
    element: <LoginPage />,
    roles: [Role.guest],
  },
  {
    path: AppRoutes.REGISTER,
    element: <RegisterPage />,
    roles: [Role.guest],
  },
  {
    path: AppRoutes.PROFILE,
    element: <ProfilePage />,
    roles: [Role.customer, Role.admin],
  },
  {
    path: AppRoutes.ORDER,
    element: (
      <OrderStoreContextProvider>
        <OrderPage />
      </OrderStoreContextProvider>
    ),
    roles: [Role.guest, Role.customer],
  },
  {
    path: AppRoutes.STATISTICS,
    element: (
      <ProductsStoreContextProvider>
        <StatisticsPage />
      </ProductsStoreContextProvider>
    ),
    roles: [Role.admin],
  },
  {
    path: AppRoutes.DASHBOARD,
    element: (
      <ProductsStoreContextProvider>
        <DashboardPage />
      </ProductsStoreContextProvider>
    ),
    roles: [Role.admin],
  },

  {
    path: AppRoutes.NOT_FOUND,
    element: <NotFoundPage />,
    roles: [],
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
  login: {
    mask: AppRoutes.LOGIN,
    create: () => AppRoutes.LOGIN,
  },
  register: {
    mask: AppRoutes.REGISTER,
    create: () => AppRoutes.REGISTER,
  },
  profile: {
    mask: AppRoutes.PROFILE,
    create: () => AppRoutes.PROFILE,
  },
  order: {
    mask: AppRoutes.ORDER,
    create: () => AppRoutes.ORDER,
  },
  statistics: {
    mask: AppRoutes.STATISTICS,
    create: () => AppRoutes.STATISTICS,
  },
  dashboard: {
    mask: AppRoutes.DASHBOARD,
    create: () => AppRoutes.DASHBOARD,
  },
  notFound: {
    mask: AppRoutes.NOT_FOUND,
    create: () => AppRoutes.NOT_FOUND,
  },
};

export const useAccessPages = (pages: TAppRoutePages[]) => {
  let userRole = rootStore.user.user?.role;

  if (userRole === undefined) {
    userRole = Role.guest;
  }

  return pages.map((page) => {
    if (page.path === AppRoutes.NOT_FOUND) {
      return page;
    }
    
    if (page.roles.includes(userRole)) {
      return page;
    }
  }).filter(Boolean);
};