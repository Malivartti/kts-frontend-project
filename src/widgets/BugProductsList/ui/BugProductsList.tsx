import { BugProductModel } from '@entities/BugProduct';
import Text from '@shared/ui/Text';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './BugProductsList.module.scss';
import ProductRow from './ProductRow';

type BugProductsListProps = {
  unavailableProductIds?: Set<number>;
  list: BugProductModel[];
  totalSum: number;
  isActions?: boolean
}

const BugProductsList: FC<BugProductsListProps> = ({ 
  unavailableProductIds = new Set(),
  list,
  totalSum,
  isActions = true,
}) => {
  const { t } = useTranslation();

  return (
    <div className={cls.BugProductsList}>
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

export default observer(BugProductsList);
