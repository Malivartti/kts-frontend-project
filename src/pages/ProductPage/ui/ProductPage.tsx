import ProductStore from '@shared/stores/ProductStore';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import BackButton from './BackButton';
import PageSkeleton from './PageSkeleton';
import Product from './Product';
import cls from './ProductPage.module.scss';

const ProductPage = () => {
  const productStore = useLocalObservable(() => new ProductStore());
  const component = productStore.isLoading ? <PageSkeleton /> : <Product productStore={productStore} />;
  const { id: productId } = useParams();

  useEffect(() => {
    productStore.getProduct(productId);
  }, [productStore, productId]);

  return (
    <div className={ cls.ProductPage__container}>
      <BackButton className={cls.ProductPage__BackButton}/>
      {component}
    </div>
  );
};

export default observer(ProductPage);
