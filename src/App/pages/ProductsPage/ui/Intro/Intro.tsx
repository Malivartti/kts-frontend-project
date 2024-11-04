import classNames from 'classnames';
import { FC } from 'react';

import Text from '@/components/Text';

import cls from './Intro.module.scss';

type IntroProps = {
  className?: string;
}

const Intro: FC<IntroProps> = ({ className }) => {
  return (
    <div className={classNames(cls.Intro, className)}>
      <Text view='title' tag='h1' className={cls.Intro__title}>Products</Text>
      <Text view='p-20' color='secondary'>We display products based on the latest products we have, if you want to see our old products please enter the name of the item</Text>
    </div>
  );
};

export default Intro;
