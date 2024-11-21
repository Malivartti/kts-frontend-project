import Skeleton from 'react-loading-skeleton';

import cls from './CardSkeleton.module.scss';


const CardSkeleton = () => {
  return (
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
  );
};

export default CardSkeleton;
