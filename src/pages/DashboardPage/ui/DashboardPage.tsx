import { useDashboardStore } from '@shared/stores/DashboardStore';
import Toast from '@shared/ui/Toast';
import { reaction } from 'mobx';
import { useEffect } from 'react';

import ProductModal from './ProductModal';
import ProductsTable from './ProductsTable';

const DashboardPage = () => {
  const dashboardStore = useDashboardStore();

  useEffect(() => {
    dashboardStore.getAllProducts();
    dashboardStore.getCategoryes();
  }, [dashboardStore]);

  useEffect(() => {
    const reactionDisposer = reaction(
      () => ({ isError: dashboardStore.isError, isSuccess: dashboardStore.isSuccess }),
      ({ isError, isSuccess }) => {
        if (isError) {
          Toast(dashboardStore.message, 'error');
        }
        if (isSuccess) {
          Toast(dashboardStore.message, 'success');
        }
      }
    );

    return () => {
      reactionDisposer();
    };
  }, []);

  return (
    <div>
      <ProductsTable/>
      <ProductModal/>
    </div>
  );
};

export default DashboardPage;
