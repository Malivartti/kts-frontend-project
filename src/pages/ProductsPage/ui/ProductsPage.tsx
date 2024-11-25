import { useProductsStore } from '@app/providers/ProductsStoreContextProvider';
import rootStore from '@shared/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Intro from './Intro';
import Paginations from './Pagination';
import ProductsList from './ProductsList';
import cls from './ProductsPage.module.scss';
import SearchAndFilter from './SearchAndFilter';

const ProductsPage = () => {
  const productsStore = useProductsStore();
  const search = rootStore.query.search;
  const [ searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(search);
  }, [setSearchParams, search]);

  useEffect(() => {
    productsStore.getProducts();
    productsStore.getCategoryes()
      .then(() => { 
        productsStore.getDataOfQueryParams();
      });
  }, [productsStore]);

  return (
    <div className={cls.ProductsPage__container}>
      <Intro className={cls.ProductsPage__Intro}/>
      <SearchAndFilter className={cls.ProductsPage__SearchAndFilter} />
      <ProductsList className={cls.ProductsPage__ProductsList} />
      <Paginations model={productsStore.paginationModel}/>
    </div>
  );
};

export default observer(ProductsPage);
