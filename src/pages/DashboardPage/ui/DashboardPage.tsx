import { useDashboardStore } from '@shared/stores/DashboardStore';
import { useTrackMetaAndToast } from '@shared/stores/RootStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ProductModal from './ProductModal';
import ProductsTable from './ProductsTable';

const DashboardPage = () => {
  const dashboardStore = useDashboardStore();
  const { t } = useTranslation('dashboard');

  useEffect(() => {
    dashboardStore.getAllProducts();
    dashboardStore.getCategoryes();
  }, [dashboardStore]);

  useTrackMetaAndToast({ t, store: dashboardStore });

  return (
    <div>
      <ProductsTable/>
      <ProductModal/>
    </div>
  );
};

export default DashboardPage;
