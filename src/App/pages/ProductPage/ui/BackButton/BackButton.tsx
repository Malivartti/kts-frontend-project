import classNames from 'classnames';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import BackIcon from '@/components/icons/BackIcon';
import Text from '@/components/Text';

import cls from './BackButton.module.scss';

type BackButtonProps = {
  className?:string
}

const BackButton: FC<BackButtonProps> = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useTranslation('product');

  const handleClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <button className={classNames(cls.BackButton, className)} onClick={handleClick}>
      <BackIcon className={cls.BackButton__icon}/>
      <Text view="p-20">{t('Назад')}</Text>
    </button>
  );
};

export default BackButton;
