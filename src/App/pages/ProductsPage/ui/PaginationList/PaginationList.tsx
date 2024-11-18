import { FC, useCallback } from 'react';

import Button, { ButtonTheme } from '@/components/Button';

import cls from './PaginationList.module.scss';

type PaginationListProps = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}
const PaginationList: FC<PaginationListProps> = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage, 
}) => {
  const generatePageNumbers = useCallback(() => {
    const pages: (number | string)[] = [1];

    if (currentPage > 3) {
      pages.push('...');
    }

    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    generatePageNumbers().map((item, index) => {
      if (item === '...') {
        return (
          <Button 
            key={index}
            theme={ButtonTheme.CLEAR} 
            className={cls.PaginationList__btn}
          >
            {item}
          </Button>
        );
      } else {
        return (
          <Button
            key={index}
            theme={(item) === currentPage ? undefined : ButtonTheme.CLEAR}
            onClick={() => setCurrentPage(Number(item))}
          >
            {item}
          </Button>
        );
      }
    })
  );
};

export default PaginationList;
