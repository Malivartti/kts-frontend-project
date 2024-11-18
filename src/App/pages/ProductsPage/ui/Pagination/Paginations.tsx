import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';

import BackIcon from '@/components/icons/BackIcon';
import ForwardIcon from '@/components/icons/ForwardIcon/ForwardIcon';
import PaginationModel from '@/stores/ProductsStore/models/PaginationModel';

import PaginationList from '../PaginationList';
import cls from './Paginations.module.scss';


type PaginationProps = {
  model: PaginationModel;
}

const Pagination: FC<PaginationProps> = ({ model }) => {
  const { currentPage, totalPages, isLoading, isFirstPage, isLastPage, decrementPage, incrementPage, setCurrentPage } = model;

  if (totalPages === 0 || totalPages === 1 || isLoading) return;
  return (
    <div className={cls.Paginations}>
      <BackIcon 
        className={
          classNames(cls.Paginations__btn, 
            { [cls.Paginations__btn_disabled]: isFirstPage })} 
        onClick={decrementPage}
      />

      <PaginationList currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        
      <ForwardIcon 
        className={
          classNames(cls.Paginations__btn, 
            { [cls.Paginations__btn_disabled]: isLastPage })} 
        onClick={incrementPage}
      />
    </div>
  );
};

export default observer(Pagination);
