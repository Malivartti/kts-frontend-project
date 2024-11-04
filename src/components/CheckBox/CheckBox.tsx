import classNames from 'classnames';
import React, { useCallback } from 'react';

import CheckIcon from '@/components/icons/CheckIcon';

import cls from './CheckBox.module.scss';

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
  className?: string;
};

const CheckBox: React.FC<CheckBoxProps> = ({
  className,
  checked,
  onChange,
  disabled,
  ...props
}) => {
  const onChangeChecked = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  }, [onChange]);

  return (
    <label
      className={classNames(
        cls.CheckBox,
        className,
        { [cls.CheckBox_disabled]: disabled }
      )}
    >
      <input
        type='checkbox'
        checked={checked}
        className={cls.CheckBox__input}
        onChange={onChangeChecked}
        disabled={disabled}
        {...props}/>
      <CheckIcon className={cls.CheckBox__check} width={40} height={40}/>
    </label>
  );};

export default CheckBox;
