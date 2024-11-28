import { BagProductModel } from '@entities/BagProduct';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './BagProductsList.module.scss';
import ProductRow from './ProductRow';

type BagProductsListProps = {
  unavailableProductIds?: Set<number>;
  list: BagProductModel[];
  totalSum: number;
  isActions?: boolean
}

const BagProductsList: FC<BagProductsListProps> = ({ 
  unavailableProductIds = new Set(),
  list,
  totalSum,
  isActions = true,
}) => {
  const { t } = useTranslation();

  return (
    <div className={cls.BagProductsList}>
      {
        list.length
          ? (
            <div>
              {...list.map(product => (
                <ProductRow
                  product={product}
                  isUnavailable={unavailableProductIds.has(product.id)}
                  isActions={isActions}
                />
              ))}
              <Text tag='div' view='p-20'>{t('Сумма')}{': $'}{totalSum}</Text>
            </div>
          )
          : <Text tag='div' view='p-20'>{t('Продукты не выбраны')}</Text>
      }
    </div>
  );
};

export default observer(BagProductsList);
