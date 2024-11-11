import React, { useEffect, useRef, useState } from 'react';

import ArrowDownIcon from '@/components/icons/ArrowDownIcon';
import Input from '@/components/Input';
import Text from '@/components/Text';
import { IOption } from '@/entities/MultiDropdown';

import cls from './MultiDropdown.module.scss';

export type MultiDropdownProps = {
  className?: string;
  options: IOption[];
  value: IOption[];
  onChange: (value: IOption[]) => void;
  disabled?: boolean;
  getTitle: (value: IOption[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
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


  const handleOptionChange = (option: IOption) => {
    if (!value.find(item => item.key === option.key)) {
      onChange([...value, option]);
    } else {
      onChange(value.filter(item => item !== option));
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={className}
    >
      <Input
        type="text"
        onFocus={() => setIsOpen(true)}
        value={isOpen ? filter : value.length ? getTitle(value) : ''}
        placeholder={getTitle(value)}
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
