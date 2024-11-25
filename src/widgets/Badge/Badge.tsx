import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import cls from './Badge.module.scss';

type BadgeProps = {
  className?: string;
  count: number
  children: ReactNode
}

const Badge: FC<BadgeProps> = ({ className, count, children }) => {
  if (!count) {
    return (
      <div className={className}>
        {children}
      </div>
    ); 
  }

  return (
    <div className={classNames(cls.Badge, className)}>
      <div className={cls.Badge__count}>{count >= 100 ? '99+' : count}</div>
      {children}
    </div>
  );
};

export default Badge;