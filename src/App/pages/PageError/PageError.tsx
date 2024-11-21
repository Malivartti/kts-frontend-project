import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import Text from '@/components/Text';

import cls from './PageError.module.scss';

const PageError = () => {
  const { t } = useTranslation();

  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className={cls.PageError}>
      <Text view='title' tag='h1'>{t('Произошла непредвиденная ошибка')}</Text>
      <Button onClick={refreshPage}>{t('Обновить страницу')}</Button>
    </div>
  );
};

export default PageError;
