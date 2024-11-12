import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';

import Button, { ButtonTheme } from '@/components/Button';
import BackIcon from '@/components/icons/BackIcon';
import ForwardIcon from '@/components/icons/ForwardIcon/ForwardIcon';
import ProductsStore from '@/stores/ProductsStore';
import rootStore from '@/stores/RootStore';

import cls from './Paginations.module.scss';

type PaginationProps = {
  productsStore: ProductsStore;
}

const Paginations: FC<PaginationProps> = ({ productsStore }) => {

  const handleBack = useCallback(() => {
    if (rootStore.currentPage !== 1) {
      productsStore.getPrevPageProducts();
    }
  }, [productsStore]);


  const handleForward = useCallback(() => {
    if (rootStore.currentPage !== productsStore.totalPages) {
      productsStore.getNextPageProducts();
    }
  }, [productsStore]);

  if (!productsStore.products.length) return;
  if (productsStore.totalPages === 1) return;
  return (
    <div className={cls.Paginations}>
      <BackIcon 
        className={
          classNames(cls.Paginations__btn, 
            { [cls.Paginations__btn_disabled]: rootStore.currentPage === 1 })} 
        onClick={handleBack}
      />

      {[...Array(productsStore.totalPages).keys()].map((key) => (
        <Button
          key={key}
          theme={(key + 1) === rootStore.currentPage ? undefined : ButtonTheme.CLEAR}
          onClick={() => productsStore.getPageProducts(key + 1)}
        >{key + 1}</Button>
      ))}

      <ForwardIcon 
        className={
          classNames(cls.Paginations__btn, 
            { [cls.Paginations__btn_disabled]: rootStore.currentPage === productsStore.totalPages })} 
        onClick={handleForward}
      />
    </div>
  );
};

export default observer(Paginations);
