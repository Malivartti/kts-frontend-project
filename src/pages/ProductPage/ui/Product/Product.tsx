import { AppRouteUrls } from '@shared/configs/router';
import ProductStore from '@shared/stores/ProductStore';
import rootStore, { useTrackMetaAndToast } from '@shared/stores/RootStore';
import Button, { ButtonTheme } from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Slider from '../Slider';
import cls from './Product.module.scss';

type ProductProps = {
  productStore: ProductStore
}

const Product: FC<ProductProps> = ({ productStore }) => {
  const product = productStore.data;
  const navigate = useNavigate();
  const { t } = useTranslation('product');

  const toBag = useCallback(() => {
    rootStore.bag.addToBag(product);
  }, [product]);

  const toOrder = useCallback(() => {
    rootStore.bag.addToBag(product);
    navigate(AppRouteUrls.order.create());
  }, [navigate, product]);

  const onError = useCallback(() => {
    navigate(AppRouteUrls.products.create());
  }, [navigate]);

  useTrackMetaAndToast({ t, store: productStore, onError });

  return (
    <div className={cls.Product}>
      <Slider className={cls.Product__slider} images={product.images}/>
      <div className={cls.Product__content}>
        <Text view='title' tag='h1' className={cls.Product__title}>{product.title}</Text>
        <Text view='p-20' tag='p' color='secondary' className={cls.Product__description}>{product.description}</Text>
        <Text view='title' className={cls.Product__price}>{`$${product.price}`}</Text>
        <div className={cls.Product__buttons}>
          <Button
            className={cls.Product__button}
            onClick={toOrder}>
            {t('Купить')}
          </Button>
          <Button
            theme={ButtonTheme.OUTLINE}
            className={cls.Product__button}
            onClick={toBag}
          >
            {t('В корзину')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default observer(Product);
