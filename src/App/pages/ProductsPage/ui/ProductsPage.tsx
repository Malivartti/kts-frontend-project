import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import rootStore from '@/stores/RootStore';

import { useProductsStore } from '../context';
import Intro from './Intro';
import Paginations from './Pagination';
import ProductsList from './ProductsList';
import cls from './ProductsPage.module.scss';
import SearchAndFilter from './SearchAndFilter';

const ProductsPage = () => {
  const paginationModel = useProductsStore().paginationModel;
  const search = rootStore.query.search;
  const [ searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams(search);
  }, [setSearchParams, search]);

  return (
    <div className={cls.ProductsPage__container}>
      <Intro className={cls.ProductsPage__Intro}/>
      <SearchAndFilter className={cls.ProductsPage__SearchAndFilter} />
      <ProductsList className={cls.ProductsPage__ProductsList} />
      <Paginations model={paginationModel}/>
    </div>
  );
};

export default observer(ProductsPage);
