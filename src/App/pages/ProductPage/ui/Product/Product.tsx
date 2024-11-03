import { FC } from 'react';

import Button, { ButtonTheme } from '@/components/Button';
import Loader from '@/components/Loader';
import Text from '@/components/Text';
import { IProduct } from '@/shared/types/Product';

import cls from './Product.module.scss';

type ProductProps = {
  product: IProduct;
  isLoading: boolean;
}

const Product: FC<ProductProps> = ({product, isLoading}) => {
  return (
    <div className={cls.Product}>
      {
        isLoading
          ? <Loader className={cls.Product__loader}/>
          : <>
            <img src={product.images[0]} alt={product.title} />
            <div className={cls.Product__content}>
              <Text view='title' tag='h1' className={cls.Product__title}>{product.title}</Text>
              <Text view='p-20' tag='p' color='secondary' className={cls.Product__description}>{product.description}</Text>
              <Text view='title' className={cls.Product__price}>{`$${product.price}`}</Text>
              <div className={cls.Product__buttons}>
                <Button className={cls.Product__button}>Buy Now</Button>
                <Button theme={ButtonTheme.OUTLINE} className={cls.Product__button}>Add to Cart</Button>
              </div>
            </div>
          </>
      }
    </div>
  );
};

export default Product;
