import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import Button, { ButtonTheme } from '@/components/Button';
import Text from '@/components/Text';
import { AppRouteUrls } from '@/configs/router';

import cls from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const toMain = useCallback(() => {
    navigate(AppRouteUrls.root);
  }, []);

  return (
    <div className={cls.NotFoundPage}>
      <div className={cls.NotFoundPage__content}>
        <Text tag='h1' view='title'>404</Text>
        <Text tag='h2' view='p-32' color='secondary'>{t('Страница не найдена')}</Text>
        <Button theme={ButtonTheme.CLEAR} onClick={toMain}>{t('Вернутся на главную')}</Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
