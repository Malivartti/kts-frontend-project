import rootStore from '@shared/stores/RootStore';
import BagIcon from '@shared/ui/icons/BagIcon';
import { FC, MouseEvent, useCallback } from 'react';

type BagProps = {
  className?: string
}

const Bag: FC<BagProps> = ({ className }) => {

  const onClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    rootStore.bag.setIsShowSidebar(true);
  }, []);

  return (
    <button type='button' onClick={onClick} className={className}>
      <BagIcon />
    </button>

  );
};

export default Bag;
