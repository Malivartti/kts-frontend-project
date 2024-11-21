import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import cls from './CardSkeleton.module.scss';


const CardSkeleton = () => {
  return (
    <SkeletonTheme 
      baseColor="var(--skeleton-base-color)"
      highlightColor="var(--skeleton-highlight-color)"
    >
      <div className={cls.CardSkeleton}>
        <Skeleton className={cls.CardSkeleton__img} />
        <div className={cls.CardSkeleton__text}>
          <Skeleton className={cls.CardSkeleton__caption} />
          <Skeleton className={cls.CardSkeleton__title}/>
          <Skeleton className={cls.CardSkeleton__subtitle} count={3}/>
          <div className={cls.CardSkeleton__content}>
            <Skeleton className={cls.CardSkeleton__price} />
            <Skeleton className={cls.CardSkeleton__action} />
          </div>
        </div> 
      </div>
    </SkeletonTheme>
  );
};

export default CardSkeleton;
