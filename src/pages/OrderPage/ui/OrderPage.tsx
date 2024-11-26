import { useOrderStore } from '@shared/stores/OrderStore';
import ProgressBar from '@widgets/ProgressBar';
import { observer } from 'mobx-react-lite';

import CongratulationStep from './CongratulationStep';
import DeliveryStep from './DeliveryStep';
import cls from './OrderPage.module.scss';
import OrderStep from './OrderStep';
import PaymentStep from './PaymentStep';

const OrderPage = () => {
  const orderStore = useOrderStore();

  return (
    <div className={cls.OrderPage}>
      <ProgressBar className={cls['OrderPage__progress-bar']} progress={orderStore.progress}/>
      <OrderStep />
      <DeliveryStep />
      <PaymentStep />
      <CongratulationStep />
    </div>
  );
};

export default observer(OrderPage);
