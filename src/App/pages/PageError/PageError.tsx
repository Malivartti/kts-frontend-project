import { useCallback } from 'react';

import Button from '@/components/Button';
import Text from '@/components/Text';

import cls from './PageError.module.scss';

const PageError = () => {

  const refreshPage = useCallback(() => {
    window.location.reload();
  }, []);

  return (
    <div className={cls.PageError}>
      <Text view='title' tag='h1'>Произошла непредвиденная ошибка</Text>
      <Button onClick={refreshPage}>Обновить страницу</Button>
    </div>
  );
};

export default PageError;
