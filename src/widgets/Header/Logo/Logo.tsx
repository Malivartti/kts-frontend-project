/* eslint-disable i18next/no-literal-string */
import { AppRoutes } from '@shared/configs/router';
import LogoIcon from '@shared/ui/icons/LogoIcon';
import Text from '@shared/ui/Text';
import { Link } from 'react-router-dom';

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
