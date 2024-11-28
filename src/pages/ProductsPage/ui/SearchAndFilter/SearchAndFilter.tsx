
import { CategoryModel } from '@entities/Category';
import { OptionModel } from '@entities/Option';
import useDebouncedFunction from '@shared/hooks/useDebouncedFunction';
import { useProductsStore } from '@shared/stores/ProductsStore';
import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import MultiDropdown from '@shared/ui/MultiDropdown';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './SearchAndFilter.module.scss';

type SearchAndFilterProps = {
  className?: string;
}

const SearchAndFilter: FC<SearchAndFilterProps> = ({ className }) => {
  const productsStore = useProductsStore();
  const { t } = useTranslation('products');

  const debouncedGetProducts = useDebouncedFunction(() => {
    productsStore.getProductsByFirst();
  }, 500);

  const formatCategoryes = useCallback((categories: CategoryModel[]): OptionModel[] => {
    return categories.map((category) => ({
      key: String(category.id),
      value: category.name,
    }));
  }, []);
  
  const getTitle = useCallback((value: OptionModel[]) => {
    return value.map((option) => option.value).join(',');
  }, []);

  const changeSearch = useCallback((search: string) => {
    productsStore.setSearch(search);
    debouncedGetProducts();
  }, [productsStore, debouncedGetProducts]);

  const changeFilter = useCallback((options: OptionModel[]) => {
    productsStore.setFilter(options);
    debouncedGetProducts();
  }, [productsStore, debouncedGetProducts]);

  return (
    <div className={classNames(cls.SearchAndFilter, className)}>
      <Input
        value={productsStore.search}
        onChange={changeSearch}
        className={cls.SearchAndFilter__Input}
        placeholder={t('Поиск продукта')}
      />
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
