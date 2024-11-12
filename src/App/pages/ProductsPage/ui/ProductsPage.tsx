import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';

import ProductsStore from '@/stores/ProductsStore';

import Intro from './Intro';
import Paginations from './Paginations';
import ProductsList from './ProductsList';
import cls from './ProductsPage.module.scss';
import SearchAndFilter from './SearchAndFilter';

const ProductsPage = () => {
  const productsStore = useLocalObservable(() => new ProductsStore());

  useEffect(() => {
    productsStore.getPageProducts();
    productsStore.getCategoryes()
      .then(() => {
        productsStore.getFilter();
      });
  }, [productsStore]);

  return (
    <div className={cls.ProductsPage__container}>
      <Intro className={cls.ProductsPage__Intro}/>
      <SearchAndFilter className={cls.ProductsPage__SearchAndFilter} productsStore={productsStore} />
      <ProductsList className={cls.ProductsPage__ProductsList} productsStore={productsStore} />
      <Paginations productsStore={productsStore} />
    </div>
  );
};

export default ProductsPage;
