import { AppRouteUrls } from '@shared/configs/router';
import Button, { ButtonTheme } from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cls from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const toMain = useCallback(() => {
    navigate(AppRouteUrls.root);
  }, [navigate]);

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
