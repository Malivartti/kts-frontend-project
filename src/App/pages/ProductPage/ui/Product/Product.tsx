import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';

import imgPlaceholder from '@/assets/imagePlaceholder.png';
import Button, { ButtonTheme } from '@/components/Button';
import Loader from '@/components/Loader';
import Text from '@/components/Text';
import { Meta } from '@/entities/Meta';
import ProductStore from '@/stores/ProductStore';

import cls from './Product.module.scss';

type ProductProps = {
  productStore: ProductStore
}

const Product: FC<ProductProps> = ({ productStore }) => {
  const product = productStore.data;

  const checkImage = useCallback((image: string) => {
    return image.startsWith('[') ? imgPlaceholder : image;
  }, []);

  if (productStore.meta === Meta.loading || productStore.meta === Meta.initial) {
    return <Loader className={cls.Product__loader}/>;
  }

  return (
    <div className={cls.Product}>
      <img src={checkImage(product.images[0])} alt={product.title} />
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
