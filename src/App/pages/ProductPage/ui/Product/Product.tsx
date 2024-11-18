import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import imgPlaceholder from '@/assets/imagePlaceholder.png';
import Button, { ButtonTheme } from '@/components/Button';
import Loader from '@/components/Loader';
import Text from '@/components/Text';
import { AppRouteUrls } from '@/configs/router';
import ProductStore from '@/stores/ProductStore';

import cls from './Product.module.scss';

type ProductProps = {
  productStore: ProductStore
}

const Product: FC<ProductProps> = ({ productStore }) => {
  const product = productStore.data;
  const navigate = useNavigate();

  const checkImage = useCallback((images: string[]): string => {
    return !images.length ? imgPlaceholder : images[0];
  }, []);

  useEffect(() => {
    if (productStore.isError) {
      navigate(AppRouteUrls.products.create());
    }
  }, [productStore.isError, navigate]);


  if (productStore.isLoading) {
    return <Loader className={cls.Product__loader}/>;
  }
      
  if (productStore.isError) {
    return null;
  }

  return (
    <div className={cls.Product}>
      <img src={checkImage(product.images)} alt={product.title} />
      <div className={cls.Product__content}>
        <Text view='title' tag='h1' className={cls.Product__title}>{product.title}</Text>
        <Text view='p-20' tag='p' color='secondary' className={cls.Product__description}>{product.description}</Text>
        <Text view='title' className={cls.Product__price}>{`$${product.price}`}</Text>
        <div className={cls.Product__buttons}>
          <Button className={cls.Product__button}>Buy Now</Button>
          <Button theme={ButtonTheme.OUTLINE} className={cls.Product__button}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Product);
