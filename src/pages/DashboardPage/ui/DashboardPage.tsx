import { useDashboardStore } from '@shared/stores/DashboardStore';
import { useEffect } from 'react';

import ProductModal from './ProductModal';
import ProductsTable from './ProductsTable';

const DashboardPage = () => {
  const dashboardStore = useDashboardStore();

  useEffect(() => {
    dashboardStore.getAllProducts();
  }, [dashboardStore]);

  return (
    <div>
      <ProductsTable/>
      <ProductModal/>
    </div>
  );
};

export default DashboardPage;
