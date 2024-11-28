import { OptionModel } from '@entities/Option';
import ArrowDownIcon from '@shared/ui/icons/ArrowDownIcon';
import Input from '@shared/ui/Input';
import Text from '@shared/ui/Text';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import cls from './MultiDropdown.module.scss';

export type MultiDropdownProps = {
  className?: string;
  options: OptionModel[];
  value: OptionModel[];
  onChange: (value: OptionModel[]) => void;
  disabled?: boolean;
  getTitle: (value: OptionModel[]) => string;
  multi?: boolean;
  placeholder?: string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
  multi = true,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);


  const handleOptionChange = (option: OptionModel) => {
    if (!value.find(item => item.key === option.key)) {
      if (!multi) {
        onChange([option]);
        return;
      }
      onChange([...value, option]);
    } else {
      if (!multi) {
        onChange([]);
        return;
      }
      onChange(value.filter(item => item.key !== option.key));
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={classNames(cls.MultiDropdown, className)}
    >
      <Input
        type="text"
        onFocus={() => setIsOpen(true)}
        value={isOpen ? filter : value.length ? getTitle(value) : ''}
        placeholder={getTitle(value) || placeholder}
        onChange={(value: string) => setFilter(value)}
        afterSlot={<ArrowDownIcon color='secondary'/>}
        disabled={disabled}
      />
      {isOpen && !disabled && !!options.length && (
        <div className={cls.MultiDropdown__options}>
          {
            options
              .filter((option) =>
                option.value.toLowerCase().includes(filter.toLowerCase())
              )
              .map((option) => (
                <button
                  className={cls.MultiDropdown__option}
                  key={option.key}
                  type='button'
                  onClick={() => handleOptionChange(option)}
                >
                  <Text view="p-16" color={value.find(item => item.key === option.key) ? 'accent' : 'primary'}>
                    {option.value}
                  </Text>
                </button>
              ))}
        </div>
      )}
    </div>
  );
};

export default MultiDropdown;
