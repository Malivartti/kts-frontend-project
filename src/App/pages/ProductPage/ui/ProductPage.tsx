import { useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ProductStore from '@/stores/ProductStore';

import BackButton from './BackButton';
import Product from './Product/Product';
import cls from './ProductPage.module.scss';


const ProductPage = () => {
  const productStore = useLocalObservable(() => new ProductStore());
  const { id: productId } = useParams();

  useEffect(() => {
    productStore.getProduct(productId);
  }, [productStore, productId]);

  return (
    <div className={ cls.ProductPage__container}>
      <BackButton className={cls.ProductPage__BackButton}/>
      <Product productStore={productStore} />
    </div>
  );
};

export default ProductPage;
