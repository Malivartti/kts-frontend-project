import { AppRouteUrls } from '@shared/configs/router';
import LoginStore from '@shared/stores/LoginStore';
import rootStore, { useTrackMetaAndToast } from '@shared/stores/RootStore';
import Button, { ButtonTheme } from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Text from '@shared/ui/Text';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cls from './LoginPage.module.scss';

const LoginPage = () => {
  const loginStore = useLocalObservable(() => new LoginStore());
  const { t } = useTranslation('login');
  const navigate = useNavigate();

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    loginStore.login();
  }, [loginStore]);

  const toRegister = useCallback(() => {
    navigate(AppRouteUrls.register.create());
  }, [navigate]);

  const onSuccess = useCallback(() => {
    navigate(AppRouteUrls.root);
  }, [navigate]);

  useTrackMetaAndToast({ t, store: rootStore.user, onSuccess });

  return (
    <div className={cls.LoginPage}>
      <form className={cls.LoginPage__form} onSubmit={onSubmit} noValidate>
        <Text 
          className={cls.LoginPage__title}
          tag='h1' 
          view='title'
        >
          {t('Вход')}
        </Text>
        <Input 
          className={cls.LoginPage__input}
          type="email" 
          value={loginStore.email} 
          onChange={loginStore.setEmail}
          error={loginStore.emailError ? t(loginStore.emailError) : ''}
          placeholder={t('Почта')}
        />
        <Input
          className={cls.LoginPage__input}
          type='password' 
          value={loginStore.password} 
          onChange={loginStore.setPassword} 
          error={loginStore.passwordError ? t(loginStore.passwordError) : ''}
          placeholder={t('Пароль')}
        />
        <Button
          className={cls['LoginPage__sign-up']}
          theme={ButtonTheme.CLEAR}
          onClick={toRegister}
          type='button'
        >
          {t('Зарегистрироваться')}
        </Button>
        <Button
          className={cls.LoginPage__btn}
          type='submit'
          loading={rootStore.user.isLoading}
        >
          {t('Войти')}
        </Button>
      </form>
    </div>
  );
};

export default observer(LoginPage);
