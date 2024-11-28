import classNames from 'classnames';
import { FC } from 'react';

import cls from './ProgressBar.module.scss';

type ProgressBarProps = {
  className?: string;
  progress: number;
}

const ProgressBar: FC<ProgressBarProps> = ({ className, progress }) => {
  if (progress < 0) {
    progress = 0;
  }
  if (progress > 100) {
    progress = 100;
  }

  return (
    <div className={classNames(cls.ProgressBar, className)}>
      <div 
        className={cls.ProgressBar__progress}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
