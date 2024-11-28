import { CategoryModel } from '@entities/Category';
import { OptionModel } from '@entities/Option';
import { useDashboardStore } from '@shared/stores/DashboardStore';
import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import ManyImageInputs from '@shared/ui/ManyImageInputs';
import MultiDropdown from '@shared/ui/MultiDropdown';
import Modal from '@widgets/Modal';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ProductModal.module.scss';

const ProductModal = () => {
  const dashboardStore = useDashboardStore();
  const { t } = useTranslation('dashboard');

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    dashboardStore.checkAndSave();
  }, [dashboardStore]);

  const formatCategoryes = useCallback((categories: CategoryModel[]): OptionModel[] => {
    return categories.map((category) => ({
      key: String(category.id),
      value: category.name,
    }));
  }, []);

  const getTitle = useCallback((value: OptionModel[]) => {
    return value.map((option) => option.value).join(',');
  }, []);

  const changeCategory = useCallback((options: OptionModel[]) => {
    dashboardStore.setCategory(options);
  }, [dashboardStore]);

  return (
    <Modal isShow={dashboardStore.isShowModal} setIsShow={dashboardStore.setIsShowModal}>
      <form className={cls.ProductModal__form} onSubmit={onSubmit} noValidate>
        <Input
          className={cls.ProductModal__input}
          type="text" 
          value={dashboardStore.title} 
          onChange={dashboardStore.setTitle}
          error={dashboardStore.titleError ? t(dashboardStore.titleError) : ''}
          placeholder={t('Заголовок')}
        />
        <Input
          className={cls.ProductModal__input}
          type="text" 
          value={dashboardStore.description} 
          onChange={dashboardStore.setDescription}
          error={dashboardStore.descriptionError ? t(dashboardStore.descriptionError) : ''}
          placeholder={t('Описание')}
        />
        <div>
          <MultiDropdown
            className={cls.ProductModal__input}
            options={formatCategoryes(dashboardStore.categories)}
            value={dashboardStore.category}
            onChange={changeCategory}
            getTitle={getTitle}
            multi={false}
            placeholder={t('Категория')}
          />
          <Input
            className={cls.ProductModal__input}
            type="text" 
            value={dashboardStore.price} 
            onChange={dashboardStore.setPrice}
            error={dashboardStore.priceError ? t(dashboardStore.priceError) : ''}
            placeholder={t('Цена')}
          />
        </div>
        <ManyImageInputs
          className={cls.ProductModal__input}
          type="text" 
          values={toJS(dashboardStore.images)} 
          onChange={dashboardStore.setImages}
          errors={dashboardStore.imagesError.map(error => error ? t(error) : '')}
          maxCount={5}
          placeholder={t('Ссылка на фото')}
        />
        <Button className={cls.ProductModal__btn} type='submit' loading={dashboardStore.isLoading}>
          {t('Сохранить')}
        </Button>
      </form>
    </Modal>
  );
};

export default observer(ProductModal);
