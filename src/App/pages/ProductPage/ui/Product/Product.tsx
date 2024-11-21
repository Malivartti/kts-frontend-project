import { observer } from 'mobx-react-lite';
import { FC, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import imgPlaceholder from '@/assets/images/imagePlaceholder.png';
import Button, { ButtonTheme } from '@/components/Button';
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
  const { t } = useTranslation('product');

  const checkImage = useCallback((images: string[]): string => {
    return !images.length ? imgPlaceholder : images[0];
  }, []);

  useEffect(() => {
    if (productStore.isError) {
      navigate(AppRouteUrls.products.create());
    }
  }, [productStore.isError, navigate]);

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
          <Button className={cls.Product__button}>{t('Купить')}</Button>
          <Button theme={ButtonTheme.OUTLINE} className={cls.Product__button}>{t('В корзину')}</Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Product);
