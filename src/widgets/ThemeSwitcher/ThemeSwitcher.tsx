import { Theme, useTheme } from '@app/providers/ThemeProvider';
import MoonIcon from '@shared/ui/icons/MoonIcon';
import SunIcon from '@shared/ui/icons/SunIcon';
import classNames from 'classnames';
import { FC } from 'react';

import cls from './ThemeSwitcher.module.scss';

type ThemeSwitcherProps = {
  className?: string
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button 
      className={classNames(cls.ThemeSwitcher, className)}
      onClick={toggleTheme}
    >
      {
        theme === Theme.LIGHT
          ? <SunIcon />
          : <MoonIcon />
      }
    </button>
  );
};

export default ThemeSwitcher;
