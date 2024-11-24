import { AppRouteUrls } from '@shared/configs/router';
import Button from '@shared/ui/Button';
import Card from '@shared/ui/Card';
import Loader from '@shared/ui/Loader';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useProductsStore } from '../../context';
import cls from './ProductsList.module.scss';

type ProductsListProps = {
  className?: string;
}

const ProductsList: FC<ProductsListProps> = ({ className }) => {
  const productsStore = useProductsStore();
  const { t } = useTranslation('products');
  const listRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLElement>, productId: number) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView();
    }
  }, [productsStore.products]);

  return (
    <div className={className}>
      <div className={cls.ProductsList__count} ref={listRef}>
        <Text view='p-32' tag='h2' className={cls.ProductsList__title}>{t('Всего продуктов')}</Text>
        {
          (productsStore.isLoading)
            ? <Loader size='m' />
            : <Text view='p-20' color='accent'>{productsStore.totalProducts}</Text>
        } 
      </div>
      <div className={cls.ProductsList__list}>
        {
          productsStore.isLoading && (
            <>
              <Card isLoading image='' title='' subtitle='' />
              <Card isLoading image='' title='' subtitle='' />
              <Card isLoading image='' title='' subtitle='' />
            </>
          )
        }
        {
          productsStore.isNoProducts
            ? (
              <Text tag='h3' view='p-20'>{t('Нет продуктов')}</Text>
            )
            : (
              productsStore.products.map(product => (
                <Link key={product.id} to={AppRouteUrls.product.create(product.id)}>
                  <Card
                    image={product.images[0]}
                    captionSlot={product.category.name}
                    title={product.title}
                    subtitle={product.description}
                    contentSlot={`$${product.price}`}
                    actionSlot={<Button onClick={(e) => handleClick(e, product.id)}>{t('В корзину')}</Button>}
                  />
                </Link>
              ))
            )
        }
      </div>
    </div>
  );
};

export default observer(ProductsList);
