import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { IProduct } from '@/shared/types/Product';

import { getProduct } from '../api';
import BackButton from './BackButton';
import Product from './Product/Product';
import cls from './ProductPage.module.scss';


const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const productId = Number(pathname.split('/').at(-1));

  useEffect(() => {
    setIsLoading(true);
    getProduct(productId)
      .then((res) => {
        setProduct(res);
        setIsLoading(false);
      });
  }, [productId]);

  return (
    <div className={ cls.ProductPage__container}>
      <BackButton className={cls.ProductPage__BackButton}/>
      <Product product={product} isLoading={isLoading} />
    </div>
  );
};

export default ProductPage;
