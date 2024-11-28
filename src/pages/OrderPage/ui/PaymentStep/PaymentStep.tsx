import { useOrderStore } from '@shared/stores/OrderStore';
import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Text from '@shared/ui/Text';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './PaymentStep.module.scss';

const PaymentStep = () => {
  const { t } = useTranslation('order');
  const orderStore = useOrderStore();

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    orderStore.paymentStepModel.checkStep();
  }, [orderStore.paymentStepModel]);

  const prevStep = useCallback(() => {
    orderStore.prevStep();
  }, [orderStore]);
  
  return (
    <div>
      <Text className={cls.PaymentStep__title} tag='h1' view='title'>
        {t('Платежная информация')}
      </Text>
      <Text className={cls.PaymentStep__sum} tag='h2' view='p-32'>{t('К оплате')}{': $'}{orderStore.orderStepModel.orderSum}</Text>
      <form className={cls.PaymentStep__form} onSubmit={onSubmit} noValidate>
        <Input
          className={cls.PaymentStep__input}
          type='text' 
          value={orderStore.paymentStepModel.number} 
          onChange={orderStore.paymentStepModel.setNumber}
          error={orderStore.paymentStepModel.numberError ? t(orderStore.paymentStepModel.numberError) : ''}
          placeholder={t('Номер карты')}
        />
        <div className={cls.PaymentStep__row}>
          <Input
            className={classNames(cls.PaymentStep__input, cls.PaymentStep__expiry)}
            type='text' 
            value={orderStore.paymentStepModel.expiry} 
            onChange={orderStore.paymentStepModel.setExpiry}
            error={orderStore.paymentStepModel.expiryError ? t(orderStore.paymentStepModel.expiryError) : ''}
            placeholder={t('Срок действия карты')}
          />
          <Input
            className={classNames(cls.PaymentStep__input, cls.PaymentStep__cvc)}
            type='text' 
            value={orderStore.paymentStepModel.cvc} 
            onChange={orderStore.paymentStepModel.setCvc}
            error={orderStore.paymentStepModel.cvcError ? t(orderStore.paymentStepModel.cvcError) : ''}
            placeholder='CVC'
          />
        </div>
        <div className={cls.PaymentStep__btns}>
          <Button className={cls.PaymentStep__prev} type='button' onClick={prevStep}>
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

export default observer(PaymentStep);
