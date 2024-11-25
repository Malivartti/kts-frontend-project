import { useProductsStore } from '@app/providers/ProductsStoreContextProvider';
import { useEffect } from 'react';

import CategoryAndProductsChart from './CategoryAndProductsChart';
import DayAndProductsChart from './DayAndProductsChart';
import cls from './StatisticsPage.module.scss';

const StatisticsPage = () => {
  const productsStore = useProductsStore();

  useEffect(() => {
    productsStore.getAllProducts();
    productsStore.getCategoryes();
  }, [productsStore]);

  return (
    <div className={cls.StatisticsPage}>
      <CategoryAndProductsChart />
      <DayAndProductsChart />
    </div>
  );
};

export default StatisticsPage;
