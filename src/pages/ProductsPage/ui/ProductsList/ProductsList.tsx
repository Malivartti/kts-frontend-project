
import { ProductModel } from '@entities/Product';
import { AppRouteUrls } from '@shared/configs/router';
import { useProductsStore } from '@shared/stores/ProductsStore';
import rootStore from '@shared/stores/RootStore';
import Button from '@shared/ui/Button';
import Card from '@shared/ui/Card';
import Loader from '@shared/ui/Loader';
import Text from '@shared/ui/Text';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useCallback, useLayoutEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import cls from './ProductsList.module.scss';

type ProductsListProps = {
  className?: string;
}

const ProductsList: FC<ProductsListProps> = ({ className }) => {
  const productsStore = useProductsStore();
  const { t } = useTranslation('products');
  const listRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback((e: MouseEvent<HTMLElement>, product: ProductModel) => {
    e.preventDefault();
    rootStore.bag.addToBag(product);
  }, []);

  useLayoutEffect(() => {
    const reactionDisposer = reaction(
      () => ({
        currentPage: productsStore.paginationModel.currentPage,
        products: productsStore.products,
      }),
      ({ currentPage }) => {
        if (currentPage === 1) {
          window.scrollTo(0, 0);
          return;
        }
    
        if (listRef.current) {
          listRef.current.scrollIntoView();
        }
      }
    );
    return () => {
      reactionDisposer();
    };
  });

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
            Array.from(Array(productsStore.limit).keys()).map(key => (
              <Card key={key} isLoading image='' title='' subtitle='' />
            ))
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
                    actionSlot={<Button onClick={(e) => handleClick(e, product)}>{t('В корзину')}</Button>}
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
