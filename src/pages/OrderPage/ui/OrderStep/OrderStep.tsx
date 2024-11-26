import { AppRouteUrls } from '@shared/configs/router';
import { useOrderStore } from '@shared/stores/OrderStore';
import rootStore from '@shared/stores/RootStore';
import Button from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import BugProductsList from '@widgets/BugProductsList';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import cls from './OrderStep.module.scss';

const OrderStep = () => {
  const orderStore = useOrderStore();
  const { t } = useTranslation('order');
  const navigate = useNavigate();
  
  const nextStep = useCallback(() => {
    orderStore.orderStepModel.checkStep();
  }, [orderStore]);

  const toProducts = useCallback(() => {
    navigate(AppRouteUrls.products.create());
  }, [navigate]);

  useEffect(() => {
    const reactionDisposer = reaction(
      () => orderStore.isError,
      isError => {
        if (isError) {
          toast(t(orderStore.error), {
            position: 'top-center',
            type: 'error',
            className: cls.OrderStep__toast,
          });
        }
      }
    );

    return () => {
      reactionDisposer();
    };
  }, [t]);

  if (!orderStore.isOrderStep) {
    return;
  }

  return (
    <div className={cls.OrderStep}>
      <Text className={cls.OrderStep__title} tag='h1' view='title'>
        {t('Подтверждение заказа')}
      </Text>
      <BugProductsList
        unavailableProductIds={new Set(orderStore.orderStepModel.unavailableProducts.map(item => item.id))} 
        list={rootStore.bug.bug}
        totalSum={rootStore.bug.totalSum}
      />
      {
        rootStore.bug.bugCount
          ? (
            <Button className={cls.OrderStep__btn} onClick={nextStep} loading={orderStore.isLoading} >
              {t('Далее')}
            </Button>
          )
          : (
            <Button className={cls.OrderStep__btn} onClick={toProducts} loading={orderStore.isLoading} >
              {t('К продуктам')}
            </Button>
          )
      }
    </div>
  );
};

export default observer(OrderStep);
