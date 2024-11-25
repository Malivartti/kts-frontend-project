import { endpoints } from '@shared/configs/api';
import { AppRouteUrls } from '@shared/configs/router';
import { randomNumber } from '@shared/lib/random';
import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { FC, ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import cls from './RandomProductLink.module.scss';

type RandomProductLinkProps = {
  className?: string;
  children?: ReactNode
}

const RandomProductLink: FC<RandomProductLinkProps> = ({ className, children }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const randomProductSelection = useCallback(async () => {
    const url = endpoints.products.get();

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
      toast(t('Не удалось получить случайный продукт'), {
        position: 'top-center',
        type: 'error',
        className: cls.RandomProductLink__toast,
      });
      console.log(e);
      navigate(AppRouteUrls.products.create());
    }
  }, [navigate, t]);

  return (
    <div onClick={randomProductSelection} className={classNames(cls.RandomProductLink, className)}>
      {children}
    </div>
  );
};

export default RandomProductLink;
