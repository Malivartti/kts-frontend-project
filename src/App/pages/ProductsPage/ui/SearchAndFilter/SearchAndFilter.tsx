import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import Input from '@/components/Input';
import MultiDropdown from '@/components/MultiDropdown';
import { IOption } from '@/entities/MultiDropdown';
import { ICategory } from '@/entities/Product';

import { useProductsStore } from '../../context';
import cls from './SearchAndFilter.module.scss';

type SearchAndFilterProps = {
  className?: string;
}

const SearchAndFilter: FC<SearchAndFilterProps> = ({ className }) => {
  const productsStore = useProductsStore();
  const { t } = useTranslation('products');

  const formatCategoryes = useCallback((categories: ICategory[]): IOption[] => {
    return categories.map((category) => ({
      key: String(category.id),
      value: category.name,
    }));
  }, []);
  
  const getTitle = useCallback((value: IOption[]) => {
    return value.map((option) => option.value).join(',');
  }, []);

  const changeSearch = useCallback((search: string) => {
    productsStore.setSearch(search);
  }, [productsStore]);

  const changeFilter = useCallback((options: IOption[]) => {
    productsStore.setFilter(options);
  }, [productsStore]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    productsStore.getProductsByFirst();
  };

  return (
    <div className={classNames(cls.SearchAndFilter, className)}>
      <form className={cls.SearchAndFilter__search} onSubmit={handleSubmit}>
        <Input
          value={productsStore.search}
          onChange={changeSearch}
          className={cls.SearchAndFilter__Input}
          placeholder={t('Поиск продукта')}
        />
        <Button>{t('Найти')}</Button>
      </form>
      <MultiDropdown
        options={formatCategoryes(productsStore.categories)}
        value={productsStore.filter}
        onChange={changeFilter}
        getTitle={getTitle}
        className={cls.SearchAndFilter__MultiDropdown}
        multi={false}
        placeholder={t('Фильтр')}
      />
    </div>
  );
};

export default observer(SearchAndFilter);
