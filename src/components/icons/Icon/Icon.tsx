
import classNames from 'classnames';
import { SVGAttributes } from 'react';

import cls from './Icon.module.scss';

export type IconProps = SVGAttributes<SVGElement> & {
    className?: string;
    color?: 'primary' | 'secondary' | 'accent';
    width?: number;
    height?: number;
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color = '',
  width=24,
  height=24,
  children,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className={classNames(className, [className, cls[color]])}
    width={width}
    height={height}
    {...props}
  >
    {children}
  </svg>
);

export default Icon;
