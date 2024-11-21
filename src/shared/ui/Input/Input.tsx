import classNames from 'classnames';
import React, { useCallback } from 'react';

import cls from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  afterSlot,
  className,
  value, 
  onChange, 
  ...props
}) => {
  const [innerValue, setInnerValue ] = React.useState<string>();

  const onChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInnerValue(e.target.value);
    onChange(e.target.value);
  }, [onChange]);

  return (
    <div className={classNames(cls.Input__wrapper, className)}>
      <input
        className={classNames(cls.Input, { [cls.Input_icon]: afterSlot })}
        type="text"
        value={innerValue || value}
        onChange={onChangeValue}
        {...props}
      />
      <span className={cls.Input__icon}>{afterSlot}</span>
    </div>
  );};

export default Input;
