import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import Text from '@/components/Text';
import { AppRoutes } from '@/configs/router';

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
      <Link to={AppRoutes.CATEGORIES} className={cls.Navbar__link}>
        <Text view='p-18' color={currentHref === AppRoutes.CATEGORIES ? 'accent' : 'primary'}>{t('Категории')}</Text>
      </Link>
      <Link to={AppRoutes.ABOUT_US} className={cls.Navbar__link}>
        <Text view='p-18' color={currentHref === AppRoutes.ABOUT_US ? 'accent' : 'primary'}>{t('О нас')}</Text>
      </Link>
    </div>
  );
};

export default Navbar;
