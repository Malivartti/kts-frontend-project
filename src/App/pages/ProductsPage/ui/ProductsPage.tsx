import { useEffect, useState } from 'react';

import { IProduct } from '@/shared/types/Product';

import { getAllProducts } from '../api';
import Intro from './Intro';
import ProductsList from './ProductsList';
import cls from './ProductsPage.module.scss';
import SearchAndFilter from './SearchAndFilter';

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getAllProducts()
      .then(res => {
        setProducts(res);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className={cls.ProductsPage__container}>
      <Intro className={cls.ProductsPage__Intro}/>
      <SearchAndFilter className={cls.ProductsPage__SearchAndFilter}/>
      <ProductsList products={products} isLoading={isLoading}/>
    </div>
  );
};

export default ProductsPage;