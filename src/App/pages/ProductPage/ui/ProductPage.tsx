import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { IProduct } from '@/entities/Product';

import { getProduct } from '../api';
import BackButton from './BackButton';
import Product from './Product/Product';
import cls from './ProductPage.module.scss';


const ProductPage = () => {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const [isLoading, setIsLoading] = useState(true);
  const { id: productId } = useParams();

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
