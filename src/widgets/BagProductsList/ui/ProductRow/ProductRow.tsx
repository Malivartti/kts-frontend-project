import { BagProductModel } from '@entities/BagProduct';
import rootStore from '@shared/stores/RootStore';
import TrashIcon from '@shared/ui/icons/TrashIcon';
import Text from '@shared/ui/Text';
import Counter from '@widgets/Counter';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useCallback } from 'react';

import cls from './ProductRow.module.scss';
type ProductRowProps = {
  product: BagProductModel;
  isUnavailable?: boolean;
  isActions?: boolean
}

const ProductRow: FC<ProductRowProps> = ({ 
  product,
  isUnavailable,
  isActions = true,
}) => {
  const increase = useCallback(() => {
    rootStore.bag.increaseProductCount(product);
  }, [product]);

  const decrease = useCallback(() => {
    rootStore.bag.decreaseProductCount(product);
  }, [product]);

  const remove = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    rootStore.bag.removeFromBag(product);
  }, [product]);

  return (
    <div className={classNames(cls.ProductRow, { [cls.ProductRow_unavailable]: isUnavailable })}>
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
      {isActions
        ? (
          <div className={cls.ProductRow__actions}>
            <Counter 
              count={product.count} 
              increase={increase}
              decrease={decrease}
            />
            <button className={cls.ProductRow__btn} onClick={remove} >
              <TrashIcon className={cls.ProductRow__icon} />
            </button>
          </div>
        )
        : (
          <Text tag='div' view='p-18'>{product.count}</Text>
        )
      }
    </div>
  );
};

export default observer(ProductRow);
