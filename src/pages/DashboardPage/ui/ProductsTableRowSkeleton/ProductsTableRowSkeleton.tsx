import Skeleton from 'react-loading-skeleton';

import cls from './ProductsTableRowSkeleton.module.scss';

const ProductsTableRowSkeleton = () => {
  return (
    <tr className={cls.ProductsTableRowSkeleton}>
      <td><Skeleton className={cls.ProductsTableRowSkeleton__id} height={20}/></td>
      <td><Skeleton className={cls.ProductsTableRowSkeleton__common} height={20}/></td>
      <td><Skeleton className={cls.ProductsTableRowSkeleton__common} height={20}/></td>
      <td className={cls.ProductsTableRowSkeleton_center}>
        <Skeleton className={cls.ProductsTableRowSkeleton__common} height={20}/>
      </td>
      <td className={cls.ProductsTableRowSkeleton_center}>
        <Skeleton className={cls.ProductsTableRowSkeleton__common} height={20}/>
      </td>
      <td className={cls.ProductsTableRowSkeleton_center}>
        <Skeleton className={cls.ProductsTableRowSkeleton__common} height={20}/>
      </td>
    </tr>
  );
};

export default ProductsTableRowSkeleton;