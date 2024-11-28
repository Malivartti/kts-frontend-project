import { useOrderStore } from '@shared/stores/OrderStore';
import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './DeliveryStep.module.scss';

const DeliveryStep = () => {
  const { t } = useTranslation('order');
  const orderStore = useOrderStore();

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    orderStore.deliveryStepModel.checkStep();
  }, [orderStore.deliveryStepModel]);

  const prevStep = useCallback(() => {
    orderStore.prevStep();
  }, [orderStore]);

  return (
    <div>
      <Text className={cls.DeliveryStep__title} tag='h1' view='title'>
        {t('Информация о доставке')}
      </Text>
      <form className={cls.DeliveryStep__form} onSubmit={onSubmit} noValidate>
        <Input
          className={cls.DeliveryStep__input}
          type='text' 
          value={orderStore.deliveryStepModel.name} 
          onChange={orderStore.deliveryStepModel.setName}
          error={orderStore.deliveryStepModel.nameError ? t(orderStore.deliveryStepModel.nameError) : ''}
          placeholder={t('Имя')}
        />
        <Input
          className={cls.DeliveryStep__input}
          type='text' 
          value={orderStore.deliveryStepModel.phone} 
          onChange={orderStore.deliveryStepModel.setPhone}
          error={orderStore.deliveryStepModel.phoneError ? t(orderStore.deliveryStepModel.phoneError) : ''}
          maxLength={11}
          placeholder={t('Номер телефона')}
        />
        <Input
          className={cls.DeliveryStep__input}
          type='text' 
          value={orderStore.deliveryStepModel.email} 
          onChange={orderStore.deliveryStepModel.setEmail}
          error={orderStore.deliveryStepModel.emailError ? t(orderStore.deliveryStepModel.emailError) : ''}
          placeholder={t('Почта')}
        />
        <Input
          className={cls.DeliveryStep__input}
          type='text' 
          value={orderStore.deliveryStepModel.city} 
          onChange={orderStore.deliveryStepModel.setCity}
          error={orderStore.deliveryStepModel.cityError ? t(orderStore.deliveryStepModel.cityError) : ''}
          placeholder={t('Город')}
        />
        <Input
          className={cls.DeliveryStep__input}
          type='text' 
          value={orderStore.deliveryStepModel.street} 
          onChange={orderStore.deliveryStepModel.setStreet}
          error={orderStore.deliveryStepModel.streetError ? t(orderStore.deliveryStepModel.streetError) : ''}
          placeholder={t('Улица')}
        />
        <Input
          className={cls.DeliveryStep__input}
          type='text' 
          value={orderStore.deliveryStepModel.house} 
          onChange={orderStore.deliveryStepModel.setHouse}
          error={orderStore.deliveryStepModel.houseError ? t(orderStore.deliveryStepModel.houseError) : ''}
          placeholder={t('Дом')}
        />
        <Input
          className={cls.DeliveryStep__input}
          type='text' 
          value={orderStore.deliveryStepModel.apartment} 
          onChange={orderStore.deliveryStepModel.setApartment}
          error={orderStore.deliveryStepModel.apartmentError ? t(orderStore.deliveryStepModel.apartmentError) : ''}
          placeholder={t('Квартира')}
        />
        <div className={cls.DeliveryStep__btns}>
          <Button className={cls.DeliveryStep__prev} type='button' onClick={prevStep}>
            {t('Назад')}
          </Button>
          <Button type='submit' loading={orderStore.isLoading} >
            {t('Далее')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default observer(DeliveryStep);
