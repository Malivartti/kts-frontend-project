import Skeleton from 'react-loading-skeleton';

import cls from './PageSkeleton.module.scss';

const PageSkeleton = () => {
  return (
    <div className={cls.PageSkeleton}>
      <Skeleton className={cls.PageSkeleton__img} />
      <div className={cls.PageSkeleton__content}>
        <Skeleton className={cls.PageSkeleton__title} />
        <div className={cls.PageSkeleton__description}>
          <Skeleton className={cls['PageSkeleton__description-item']} count={5}/>
        </div>
        <Skeleton className={cls.PageSkeleton__price} />
        <div className={cls.PageSkeleton__buttons}>
          <Skeleton className={cls.PageSkeleton__button} />
          <Skeleton className={cls.PageSkeleton__button} />
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
