import { useOrderStore } from '@shared/stores/OrderStore';
import { useTrackMetaAndToast } from '@shared/stores/RootStore';
import ProgressBar from '@widgets/ProgressBar';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import CongratulationStep from './CongratulationStep';
import DeliveryStep from './DeliveryStep';
import cls from './OrderPage.module.scss';
import OrderStep from './OrderStep';
import PaymentStep from './PaymentStep';

const OrderPage = () => {
  const orderStore = useOrderStore();
  const { t } = useTranslation('order');

  useTrackMetaAndToast({ t, store: orderStore });

  return (
    <div className={cls.OrderPage}>
      <ProgressBar className={cls['OrderPage__progress-bar']} progress={orderStore.progress}/>
      {orderStore.isOrderStep && <OrderStep />}
      {orderStore.isDeliveryStep && <DeliveryStep />}
      {orderStore.isPaymentStep && <PaymentStep />}
      {orderStore.isCongratulationStep && <CongratulationStep />}
    </div>
  );
};

export default observer(OrderPage);
