import Text from '@shared/ui/Text';
import classNames from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './Intro.module.scss';

type IntroProps = {
  className?: string;
}

const Intro: FC<IntroProps> = ({ className }) => {
  const { t } = useTranslation('products');
  return (
    <div className={classNames(cls.Intro, className)}>
      <Text view='title' tag='h1' className={cls.Intro__title}>{t('Заголовок')}</Text>
      <Text view='p-20' color='secondary'>{t('Описание')}</Text>
    </div>
  );
};

export default Intro;
