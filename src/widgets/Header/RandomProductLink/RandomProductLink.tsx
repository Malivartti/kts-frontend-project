import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { FC, ReactNode, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { endpoints } from '@/configs/api';
import { AppRouteUrls } from '@/configs/router';
import { randomNumber } from '@/shared/lib/random';

import cls from './RandomProductLink.module.scss';

type RandomProductLinkProps = {
  className?: string;
  children?: ReactNode
}

const RandomProductLink: FC<RandomProductLinkProps> = ({ className, children }) => {
  const navigate = useNavigate();

  const randomProductSelection = useCallback(async () => {
    const url = endpoints.products.getProducts();

    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url,
      });

      const products = res.data;
      const randomProduct = products[randomNumber(0, products.length - 1)];
      if (randomProduct !== undefined) {
        navigate(AppRouteUrls.product.create(randomProduct.id));
      }
    } catch (e) {
      console.log(e);
      navigate(AppRouteUrls.products.create());
    }
  }, [navigate]);

  return (
    <div onClick={randomProductSelection} className={classNames(cls.RandomProductLink, className)}>
      {children}
    </div>
  );
};

export default RandomProductLink;
