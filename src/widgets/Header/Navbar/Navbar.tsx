import { Role } from '@entities/User';
import { AppRoutes } from '@shared/configs/router';
import Text from '@shared/ui/Text';
import AccessComponent from '@widgets/AccessComponent/AccessComponent';
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
      <AccessComponent roles={[Role.guest, Role.customer]}>
        <Link to={AppRoutes.PRODUCTS} className={cls.Navbar__link}>
          <Text view='p-18' color={currentHref === AppRoutes.PRODUCTS ? 'accent' : 'primary'}>{t('Продукты')}</Text>
        </Link>
        <RandomProductLink className={cls.Navbar__link}>
          <Text view='p-18' color='primary'>{t('Случайный продукт')}</Text>
        </RandomProductLink>
        <Link to={AppRoutes.ABOUT_US} className={cls.Navbar__link}>
          <Text view='p-18' color={currentHref === AppRoutes.ABOUT_US ? 'accent' : 'primary'}>{t('О нас')}</Text>
        </Link>
      </AccessComponent>
      <AccessComponent roles={[Role.admin]}>
        <Link to={AppRoutes.STATISTICS} className={cls.Navbar__link}>
          <Text view='p-18' color={currentHref === AppRoutes.STATISTICS ? 'accent' : 'primary'}>{t('Статистика')}</Text>
        </Link>
        <Link to={AppRoutes.DASHBOARD} className={cls.Navbar__link}>
          <Text view='p-18' color={currentHref === AppRoutes.DASHBOARD ? 'accent' : 'primary'}>{t('Панель управления')}</Text>
        </Link>
      </AccessComponent>
    </div>
  );
};

export default Navbar;
