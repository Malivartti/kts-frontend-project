import { AppRoutes } from '@shared/configs/router';
import Text from '@shared/ui/Text';
import RandomProductLink from '@widgets/Header/RandomProductLink';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import cls from './Navbar.module.scss';

const Navbar = () => {
  const { pathname } = useLocation();
  const currentHref = '/' + pathname.split('/').at(-1);
  const { t } = useTranslation();

  return (
    <div className={cls.Navbar}>
      <Link to={AppRoutes.PRODUCTS} className={cls.Navbar__link}>
        <Text view='p-18' color={currentHref === AppRoutes.PRODUCTS ? 'accent' : 'primary'}>{t('Продукты')}</Text>
      </Link>
      <RandomProductLink className={cls.Navbar__link}>
        <Text view='p-18' color='primary'>{t('Случайный продукт')}</Text>
      </RandomProductLink>
      <Link to={AppRoutes.ABOUT_US} className={cls.Navbar__link}>
        <Text view='p-18' color={currentHref === AppRoutes.ABOUT_US ? 'accent' : 'primary'}>{t('О нас')}</Text>
      </Link>
    </div>
  );
};

export default Navbar;
