import { ProductModel } from '@entities/Product';
import { useDashboardStore } from '@shared/stores/DashboardStore';
import Button from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { MouseEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import ProductsTableRow from '../ProductsTableRow';
import ProductsTableRowSkeleton from '../ProductsTableRowSkeleton';
import cls from './ProductsTable.module.scss';


const ProductsTable = () => {
  const dashboardStore = useDashboardStore();
  const { t } = useTranslation('dashboard');

  const onCreate = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dashboardStore.openCreateModal();
  }, [dashboardStore]);

  const onChange = useCallback((e: MouseEvent<HTMLButtonElement>, product: ProductModel) => {
    e.stopPropagation();
    dashboardStore.setSelectedProduct(product);
    dashboardStore.openUpdateModal();
  }, [dashboardStore]);

  const onDelete = useCallback((product: ProductModel) => {
    dashboardStore.setSelectedProduct(product);
    dashboardStore.deleteProduct();
  }, [dashboardStore]);

  return (
    <div className={cls.ProductsTable}>
      <div className={cls.ProductsTable__top}>
        <Text tag='h2' view='p-20'>
          {t('Всего')}
        </Text>
        <Button onClick={onCreate}>
          {t('Создать')}
        </Button>
      </div>
      <table className={cls.ProductsTable__table}>
        <thead>
          <tr>
            <th className={cls.ProductsTable__id}><Text tag='span' view='p-20'>{'id'}</Text> </th>
            <th className={cls.ProductsTable__title}><Text tag='span' view='p-20'>{t('Заголовок')}</Text></th>
            <th className={cls.ProductsTable__category}><Text tag='span' view='p-20'>{t('Категория')}</Text></th>
            <th className={cls.ProductsTable__price}><Text tag='span' view='p-20'>{t('Цена')}</Text></th>
            <th className={cls.ProductsTable__btn}><Text tag='span' view='p-20'>{t('Изменить')}</Text></th>
            <th className={cls.ProductsTable__btn}><Text tag='span' view='p-20'>{t('Удалить')}</Text></th>
          </tr>
        </thead>
        <tbody>
          {
            dashboardStore.isLoading
              ? (
                Array.from(Array(20).keys()).map(key => (
                  <ProductsTableRowSkeleton key={key} />
                ))
              )
              : (
                dashboardStore.products.map((product) => (
                  <ProductsTableRow
                    key={product.id}
                    product={product}
                    onChange={(e: MouseEvent<HTMLButtonElement>) => onChange(e, product)}
                    onDelete={() => onDelete(product)} />
                ))
              )
          }
        </tbody>
      </table>
    </div>
  );
};

export default observer(ProductsTable);
