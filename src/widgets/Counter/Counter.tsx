import Button, { ButtonTheme } from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import classNames from 'classnames';
import { FC } from 'react';

import cls from './Counter.module.scss';

type CounterProps = {
  className?: string;
  count: number;
  increase: () => void;
  decrease: () => void;
}

const Counter: FC<CounterProps> = ({ className, count, increase, decrease }) => {
  return (
    <div className={classNames(cls.Counter, className)}>
      <Button className={cls.Counter__btn} type='button' onClick={decrease} theme={ButtonTheme.CLEAR}>-</Button>
      <Text className={cls.Counter__count} tag='div' view='p-18'>{count}</Text>
      <Button className={cls.Counter__btn} type='button' onClick={increase} theme={ButtonTheme.CLEAR}>+</Button>
    </div>
  );
};

export default Counter;