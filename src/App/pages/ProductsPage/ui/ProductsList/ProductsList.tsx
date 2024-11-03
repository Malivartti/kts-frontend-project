import { FC, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import Button from '@/components/Button';
import Card from '@/components/Card';
import Loader from '@/components/Loader';
import Text from '@/components/Text';
import { IProduct } from '@/shared/types/Product';

import cls from './ProductsList.module.scss';

type ProductsListProps = {
  products: IProduct[];
  isLoading: boolean;
}

const ProductsList: FC<ProductsListProps> = ({ products, isLoading }) => {

  const handleClick = (e: MouseEvent<HTMLElement>, productId: number) => {
    e.preventDefault();
    console.log(productId);
  };

  return (
    <div>
      <div className={cls.ProductsList__count}>
        <Text tag='h2' className={cls.ProductsList__title}>Total Product</Text>
        {
          isLoading
            ? <Loader size='m' />
            : <Text view='p-20' color='accent'>{products.length}</Text>
        } 
      </div>
      <div className={cls.ProductsList__list}>
        {
          products.map(product => (
            <Link key={product.id} to={String(product.id)}>
              <Card
                image={product.images[0]}
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

export default ProductsList;
