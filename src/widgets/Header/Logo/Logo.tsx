/* eslint-disable i18next/no-literal-string */
import { Link } from 'react-router-dom';

import LogoIcon from '@/components/icons/LogoIcon';
import Text from '@/components/Text';
import { AppRoutes } from '@/configs/router';

import cls from './Logo.module.scss';

const Logo = () => {
  return (
    <Link to={AppRoutes.MAIN} className={cls.Logo}>
      <LogoIcon className={cls.Logo__icon}/>
      <Text view='p-20' weight='bold'>Lalasia</Text>
    </Link>
  );
};

export default Logo;
