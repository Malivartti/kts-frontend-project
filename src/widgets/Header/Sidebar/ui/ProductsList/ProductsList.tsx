import rootStore from '@shared/stores/RootStore';
import Button from '@shared/ui/Button';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';

import ProductRow from '../ProductRow';
import cls from './ProductsList.module.scss';

const ProductsList = () => {
  const { t } = useTranslation();

  return (
    <div className={cls.ProductsList}>
      {
        rootStore.bug.bugCount
          ? (
            <>
              {...rootStore.bug.bug.map(product => (
                <ProductRow product={product} />
              ))}
              <Button className={cls.ProductsList__btn}>
                {t('Купить')}
              </Button>
            </>

          )
          : (
            <></>
          )
      }
    </div>
  );
};

export default observer(ProductsList);
