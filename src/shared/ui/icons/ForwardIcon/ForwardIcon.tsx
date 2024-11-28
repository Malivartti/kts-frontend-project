import { FC } from 'react';

import Icon, { IconProps } from '../Icon';

const ForwardIcon: FC<IconProps> = ({
  width=32,
  height=32,
  ...props
}) => (
  <Icon
    viewBox="0 0 32 32"
    width={width}
    height={height}
    {...props}>
    <path d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </Icon>
);

export default ForwardIcon;