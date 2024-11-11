import classNames from 'classnames';
import React from 'react';

import imgPlaceholder from '@/assets/imagePlaceholder.png';
import Text from '@/components/Text';

import cls from './Card.module.scss';

export type CardProps = {
    className?: string,
    image: string;
    captionSlot?: React.ReactNode;
    title: React.ReactNode;
    subtitle: React.ReactNode;
    contentSlot?: React.ReactNode;
    onClick?: React.MouseEventHandler;
    actionSlot?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
}) => (
  <div className={classNames(cls.Card, className)} onClick={onClick}>
    <img className={cls.Card__img} src={image || imgPlaceholder} alt="card" />
    <div className={cls.Card__text}>
      {captionSlot && <Text view="p-14" color="secondary" weight="medium" className={cls.Card__captionSlot}>{captionSlot}</Text>}
      {title && <Text view="p-20" color="primary" maxLines={2} className={cls.Card__title}>{title}</Text>}
      {subtitle && <Text view="p-16" color="secondary" maxLines={3} className={cls.Card__subtitle}>{subtitle}</Text>}
      <div className={cls.Card__content}>
        {contentSlot && <Text view="p-18" color="primary" weight="bold">{contentSlot}</Text>}
        {actionSlot && <div className={cls.Card__action}>{actionSlot}</div>}
      </div>
    </div>
  </div>
);

export default Card;
