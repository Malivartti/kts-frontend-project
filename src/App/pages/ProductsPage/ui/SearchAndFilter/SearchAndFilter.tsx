import classNames from 'classnames';
import { FC } from 'react';

import Button from '@/components/Button';
import Input from '@/components/Input';
import MultiDropdown from '@/components/MultiDropdown';

import cls from './SearchAndFilter.module.scss';

type SearchAndFilterProps = {
  className?: string;
}

const SearchAndFilter: FC<SearchAndFilterProps> = ({ className }) => {
  return (
    <div className={classNames(cls.SearchAndFilter, className)}>
      <div className={cls.SearchAndFilter__search}>
        <Input value='' onChange={() => ''} className={cls.SearchAndFilter__Input}/>
        <Button>Find now</Button>
      </div>
      <MultiDropdown
        options={[
          { key: 'msk', value: 'Москва' },
          { key: 'spb', value: 'Санкт-Петербург' },
          { key: 'ekb', value: 'Екатеринбург' }
        ]}
        value={[]}
        onChange={() => ''}
        getTitle={() => ''}
        className={cls.SearchAndFilter__MultiDropdown}
      />
    </div>
  );
};

export default SearchAndFilter;
