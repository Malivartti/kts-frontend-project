import { useOrderStore } from '@shared/stores/OrderStore';
import Text from '@shared/ui/Text';
import BugProductsList from '@widgets/BugProductsList';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import cls from './CongratulationStep.module.scss';

const CongratulationStep = () => {
  const { t } = useTranslation('order');
  const orderStore = useOrderStore();

  if (!orderStore.isCongratulationStep) {
    return;
  }

  return (
    <div>
      <Text className={cls.CongratulationStep__title} tag='h1' view='title'>
        {t('Поздравляем')}
      </Text>
      <Text className={cls.CongratulationStep__products} tag='div' view='p-20'>
        {t('Продукты')}
      </Text>
      <BugProductsList
        list={orderStore.orderStepModel.order}
        totalSum={orderStore.orderStepModel.orderSum}
        isActions={false}
      />

      <Text className={cls.CongratulationStep__message} tag='div' view='p-20'>
        {t('Будут доставлены по адресу')}{': '}{orderStore.deliveryStepModel.fullAddress}
      </Text>
      <Text className={cls.CongratulationStep__message} tag='div' view='p-20'>
        {t('На имя получателя')}{': '}{orderStore.deliveryStepModel.name}
      </Text>
      <Text className={cls.CongratulationStep__message} tag='div' view='p-20'>
        {t('Статус доставки вы можете отслеживать на почте')}{': '}{orderStore.deliveryStepModel.email}
      </Text>
      <Text className={cls.CongratulationStep__message} tag='div' view='p-20'>
        {t('Курьер позвонит на номер телефона')}{': '}{orderStore.deliveryStepModel.phone}
      </Text>
    </div>
  );
};

export default observer(CongratulationStep);
