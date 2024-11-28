import BagIcon from '@shared/ui/icons/BagIcon';
import { FC, MouseEvent, useCallback, useState } from 'react';

import Sidebar from '../Sidebar';

type BagProps = {
  className?: string
}

const Bag: FC<BagProps> = ({ className }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const onClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsShow(true);
  }, []);

  return (
    <div className={className}>
      <button type='button' onClick={onClick}>
        <BagIcon />
      </button>
      <Sidebar isShow={isShow} setIsShow={setIsShow} />
    </div>
  );
};

export default Bag;
