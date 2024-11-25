import { ProductModel } from '@entities/Product';
import rootStore from '@shared/stores/RootStore';
import TrashIcon from '@shared/ui/icons/TrashIcon';
import Text from '@shared/ui/Text';
import Counter from '@widgets/Counter';
import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useCallback } from 'react';

import cls from './ProductRow.module.scss';
type ProductRowProps = {
  product: ProductModel;
}

const ProductRow: FC<ProductRowProps> = ({ product }) => {
  const count = rootStore.bug.bug.find(item => item.id === product.id).count;

  const increase = useCallback(() => {
    rootStore.bug.increaseProductCount(product);
  }, [product]);

  const decrease = useCallback(() => {
    rootStore.bug.decreaseProductCount(product);
  }, [product]);

  const remove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    rootStore.bug.removeFromBug(product);
  }, [product]);

  return (
    <div className={cls.ProductRow}>
      <div className={cls.ProductRow__content}>
        <div
          className={cls.ProductRow__img}
          style={{ 'backgroundImage': `url(${product.images[0]})` }}
        ></div>
        <div className={cls.ProductRow__text}>
          <Text tag='div' view='p-20' maxLines={1}>{product.title}</Text>
          <Text tag='div' view='p-18' weight='bold'>{`$${product.price}`}</Text>
        </div>
      </div>
      <div className={cls.ProductRow__actions}>
        <Counter 
          count={count} 
          increase={increase}
          decrease={decrease}
        />
        <button className={cls.ProductRow__btn} onClick={remove} >
          <TrashIcon className={cls.ProductRow__icon} />
        </button>
      </div>
    </div>
  );
};

export default observer(ProductRow);
