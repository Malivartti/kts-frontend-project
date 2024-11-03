import classNames from 'classnames';
import { FC } from 'react';

import { Theme, useTheme } from '@/App/providers/ThemeProvider';
import MoonIcon from '@/components/icons/MoonIcon';
import SunIcon from '@/components/icons/SunIcon';

import cls from './ThemeSwitcher.module.scss';

type ThemeSwitcherProps = {
  className?: string
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({className}) => {
  const {theme, toggleTheme} = useTheme();

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
