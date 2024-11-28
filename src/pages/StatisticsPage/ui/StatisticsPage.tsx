
import { useProductsStore } from '@shared/stores/ProductsStore';
import { useTrackMetaAndToast } from '@shared/stores/RootStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import CategoryAndProductsChart from './CategoryAndProductsChart';
import DayAndProductsChart from './DayAndProductsChart';
import cls from './StatisticsPage.module.scss';

const StatisticsPage = () => {
  const productsStore = useProductsStore();
  const { t } = useTranslation('statistics');

  useEffect(() => {
    productsStore.getAllProducts();
    productsStore.getCategoryes();
  }, [productsStore]);

  useTrackMetaAndToast({ t, store: productsStore });

  return (
    <div className={cls.StatisticsPage}>
      <CategoryAndProductsChart />
      <DayAndProductsChart />
    </div>
  );
};

export default StatisticsPage;
