import { AppRouteUrls } from '@shared/configs/router';
import rootStore from '@shared/stores/RootStore';
import Text from '@shared/ui/Text';
import Popup from '@widgets/Popup';
import { observer } from 'mobx-react-lite';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import cls from './SignIn.module.scss';

interface SignInProps {
    className?: string;
}

const SignIn: FC<SignInProps> = ({ className }) => {
  const { t } = useTranslation();

  const onSignOut = useCallback(() => {
    rootStore.user.logoutUser();
  }, []);
  
  return (
    <div className={className}>
      {
        rootStore.user.isLogin
          ? (
            <Popup button={<Text tag='div' view='p-18'>{rootStore.user.user?.name}</Text>}>
              <Link to={AppRouteUrls.profile.create()}>
                <Text tag='div' view='p-18'>{t('Профиль')}</Text>
              </Link>
              <button className={cls.SignIn__btn} type='button' onClick={onSignOut}>
                <Text tag='div' view='p-18' >{t('Выйти')}</Text>
              </button>
            </Popup>
          )
          : (
            <Link to={AppRouteUrls.login.create()}>{t('Войти')}</Link>
          )
      }
    </div>
  );
};

export default observer(SignIn);
