
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';

import Input from '../Input';
import cls from './ManyImageInputs.module.scss';


type ManyImageInputsProps = Omit<
React.InputHTMLAttributes<HTMLInputElement>,
'onChange' | 'value'
> & {
  className?: string;
  values: string[];
  onChange: (values: string[]) => void;
  maxCount?: number;
  errors: string[];
}

const ManyImageInputs: FC<ManyImageInputsProps> = ({
  className,
  values,
  onChange,
  errors,
  maxCount,
  ...props
}) => {
  const handleChange = useCallback((value: string, key: number) => {
    const newValues = [...values];
    newValues[key] = value;
    onChange(newValues);
  }, [values, onChange]);

  return (
    <div className={cls.ManyImageInputs}>
      {Array.from(Array(values.length + Number(values.length !== maxCount)).keys()).map(key => (
        <div className={classNames(cls['ManyImageInputs__input-block'], className)} key={key}>
          <div className={cls['ManyImageInputs__img-wrapper']}>
            <div className={cls.ManyImageInputs__img} style={{ 'backgroundImage': `url(${values[key]})` }}></div>
          </div>
          <Input
            className={cls.ManyImageInputs__input}
            value={values[key] || ''}
            onChange={(value: string) => handleChange(value, key)}
            error={errors[key]}
            {...props}
          />
        </div>
      ))}
    </div>
  );
};

export default observer(ManyImageInputs);