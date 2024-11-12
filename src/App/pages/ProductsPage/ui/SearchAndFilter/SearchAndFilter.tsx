import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import Button from '@/components/Button';
import Input from '@/components/Input';
import MultiDropdown from '@/components/MultiDropdown';
import { IOption } from '@/entities/MultiDropdown';
import { ICategory } from '@/entities/Product';
import ProductsStore from '@/stores/ProductsStore';

import cls from './SearchAndFilter.module.scss';

type SearchAndFilterProps = {
  className?: string;
  productsStore: ProductsStore;
}

const SearchAndFilter: FC<SearchAndFilterProps> = ({ className, productsStore }) => {
  const [ searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get('search') || '';

  const formatCategoryes = useCallback((categories: ICategory[]): IOption[] => {
    return categories.map((category) => ({
      key: String(category.id),
      value: category.name,
    }));
  }, []);

  const getNewQueries = useCallback((qKey: string, qValue: string): Record<string, string> => {
    const newQueries: Record<string, string> = {};
    for (const [key, value] of searchParams.entries()) {
      newQueries[key] = value;
    }
    if (qValue) {
      newQueries[qKey] = qValue;
    } else {
      delete newQueries[qKey];
    }
    return newQueries;
  }, [searchParams]);

  const getTitle = useCallback((value: IOption[]) => {
    return value.map((option) => option.value).join(',');
  }, []);

  const changeSearch = useCallback((search: string) => {
    setSearchParams(getNewQueries('search', search));
  }, [setSearchParams, getNewQueries]);

  const changeFilter = useCallback((options: IOption[]) => {
    productsStore.setFilter(options);
    new Promise((res) => {
      setSearchParams(getNewQueries('filter', options.map(option => option.key).join(',')));
      res(true);
    }).then(() => {
      productsStore.getPageProducts(1);
    });
  }, [productsStore, setSearchParams, getNewQueries]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    productsStore.getPageProducts(1);
  };

  return (
    <div className={classNames(cls.SearchAndFilter, className)}>
      <form className={cls.SearchAndFilter__search} onSubmit={handleSubmit}>
        <Input
          value={searchValue}
          onChange={changeSearch}
          className={cls.SearchAndFilter__Input}
        />
        <Button>Find now</Button>
      </form>
      <MultiDropdown
        options={formatCategoryes(productsStore.categories)}
        value={productsStore.filter}
        onChange={changeFilter}
        getTitle={getTitle}
        className={cls.SearchAndFilter__MultiDropdown}
        multi={false}
      />
    </div>
  );
};

export default observer(SearchAndFilter);
