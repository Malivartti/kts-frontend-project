import classNames from 'classnames';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import BackIcon from '@/components/icons/BackIcon';
import Text from '@/components/Text';

import cls from './BackButton.module.scss';

type BackButtonProps = {
  className?:string
}

const BackButton: FC<BackButtonProps> = ({className}) => {
  const navigate = useNavigate();

  return (
    <button className={classNames(cls.BackButton, className)} onClick={() => navigate(-1)}>
      <BackIcon className={cls.BackButton__icon}/>
      <Text view="p-20">Назад</Text>
    </button>
  );
};

export default BackButton;
