import { ProductModel } from '@entities/Product';
import Button, { ButtonTheme } from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ProductsTableRow.module.scss';

type ProductsTableRowProps = {
  product?: ProductModel;
  onChange: (e: MouseEvent<HTMLButtonElement>) => void;
  onDelete: () => void;
}

const ProductsTableRow: FC<ProductsTableRowProps> = ({ product, onChange, onDelete }) => {
  const { t } = useTranslation('dashboard');

  return (
    <tr>
      <td><Text tag='span' view='p-20'>{product.id}</Text></td>
      <td><Text tag='span' view='p-20'>{product.title}</Text></td>
      <td><Text tag='span' view='p-20'>{product.category.name}</Text></td>
      <td className={cls.ProductsTableRow_center}><Text tag='span' view='p-20'>{product.price}</Text></td>
      <td><Button className={cls.ProductsTableRow__btn} theme={ButtonTheme.CLEAR} onClick={onChange}>
        {t('Изменить')}
      </Button></td>
      <td><Button className={cls.ProductsTableRow__btn} theme={ButtonTheme.CLEAR} onClick={onDelete}>
        {t('Удалить')}
      </Button></td>
    </tr>
  );
};

export default ProductsTableRow;
