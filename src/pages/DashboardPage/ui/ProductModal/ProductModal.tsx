import { useDashboardStore } from '@shared/stores/DashboardStore';
import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Modal from '@widgets/Modal';
import { observer } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ProductModal.module.scss';

const ProductModal = () => {
  const dashboardStore = useDashboardStore();
  const { t } = useTranslation('dashboard');

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    // profileStore.updateUser();
  }, []);

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
        <Button className={cls.ProductModal__btn} type='submit'>{t('Сохранить')}</Button>
      </form>
    </Modal>
  );
};

export default observer(ProductModal);
