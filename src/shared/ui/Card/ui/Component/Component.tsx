import { FC } from 'react';

import Card, { CardProps } from '../Card/Card';
import CardSkeleton from '../CardSkeleton';

type ComponentProps = CardProps & {
  isLoading?: boolean;
}

const Component: FC<ComponentProps> = ({ isLoading, ...props }) => {
  if (isLoading) {
    return <CardSkeleton />;
  } else {
    return <Card {...props}/>;
  }
};

export default Component;
