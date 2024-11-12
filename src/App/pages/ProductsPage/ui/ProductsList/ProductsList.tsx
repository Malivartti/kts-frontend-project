import { observer } from 'mobx-react-lite';
import { FC, MouseEvent, useCallback } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Loader from '@/components/Loader';
import Text from '@/components/Text';
import { AppRouteUrls } from '@/configs/router';
import { Meta } from '@/entities/Meta';
import ProductsStore from '@/stores/ProductsStore';

import cls from './ProductsList.module.scss';

type ProductsListProps = {
  className?: string;
  productsStore: ProductsStore
}

const ProductsList: FC<ProductsListProps> = ({ className, productsStore }) => {
  const handleClick = useCallback((e: MouseEvent<HTMLElement>, productId: number) => {
    e.preventDefault();
  }, []);

  const checkImage = useCallback((image: string) => {
    return image.startsWith('[') ? '' : image;
  }, []);

  return (
    <div className={className}>
      <div className={cls.ProductsList__count}>
        <Text view='p-32' tag='h2' className={cls.ProductsList__title}>Total Product</Text>
        {
          (productsStore.meta === Meta.initial || productsStore.meta === Meta.loading)
            ? <Loader size='m' />
            : <Text view='p-20' color='accent'>{productsStore.totalProducts}</Text>
        } 
      </div>
      <div className={cls.ProductsList__list}>
        {
          productsStore.products.map(product => (
            <Link key={product.id} to={AppRouteUrls.product.create(product.id)}>
              <Card
                image={checkImage(product.images[0])}
                captionSlot={product.category.name}
                title={product.title}
                subtitle={product.description}
                contentSlot={`$${product.price}`}
                actionSlot={<Button onClick={(e) => handleClick(e, product.id)}>Add to Cart</Button>}
              />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default observer(ProductsList);
