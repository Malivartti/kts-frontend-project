import BugIcon from '@shared/ui/icons/BugIcon';
import classNames from 'classnames';
import { FC, MouseEvent, useCallback, useState } from 'react';

import Sidebar from '../Sidebar';
import cls from './Bug.module.scss';

type BugProps = {
  className?: string
}

const Bug: FC<BugProps> = ({ className }) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const onClick = useCallback((e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsShow(true);
  }, []);

  return (
    <div className={classNames(cls.Bug, className)}>
      <button type='button' onClick={onClick}>
        <BugIcon className={cls.Bug__icon} />
      </button>
      <Sidebar isShow={isShow} setIsShow={setIsShow} />
    </div>
  );
};

export default Bug;
