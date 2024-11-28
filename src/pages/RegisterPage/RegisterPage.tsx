import { AppRouteUrls } from '@shared/configs/router';
import RegisterStore from '@shared/stores/RegisterStore';
import rootStore, { useTrackMetaAndToast } from '@shared/stores/RootStore';
import Button, { ButtonTheme } from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Text from '@shared/ui/Text';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import cls from './RegisterPage.module.scss';

const RegisterPage = () => {
  const registerStore = useLocalObservable(() => new RegisterStore());
  const { t } = useTranslation('register');
  const navigate = useNavigate();

  const onSuccess = useCallback(() => {
    navigate(AppRouteUrls.root);
  }, [navigate]);

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    registerStore.register();
  }, [registerStore]);

  const toLogin = useCallback(() => {
    navigate(AppRouteUrls.login.create());
  }, [navigate]);

  useTrackMetaAndToast({ t, store: rootStore.user, onSuccess });

  return (
    <div className={cls.RegisterPage}>
      <form className={cls.RegisterPage__form} onSubmit={onSubmit} noValidate>
        <Text
          className={cls.RegisterPage__title}
          tag='h1'
          view='title'
        >
          {t('Регистрация')}
        </Text>
        <div
          className={cls.RegisterPage__avatar}
          style={{ backgroundImage: `url(${registerStore.avatar})` }}
        ></div>
        <Input 
          className={cls.RegisterPage__input}
          type='text' 
          value={registerStore.avatar} 
          onChange={registerStore.setAvatar}
          error={registerStore.avatarError ? t(registerStore.avatarError) : ''}
          placeholder={t('Ссылка на изображение')}
        />
        <Input 
          className={cls.RegisterPage__input}
          type="text" 
          value={registerStore.name} 
          onChange={registerStore.setName}
          error={registerStore.nameError ? t(registerStore.nameError) : ''}
          placeholder={t('Имя')}
        />
        <Input 
          className={cls.RegisterPage__input}
          type="email" 
          value={registerStore.email} 
          onChange={registerStore.setEmail}
          error={registerStore.emailError ? t(registerStore.emailError) : ''}
          placeholder={t('Почта')}
        />
        <Input 
          className={cls.RegisterPage__input}
          type='password' 
          value={registerStore.password} 
          onChange={registerStore.setPassword}
          error={registerStore.passwordError ? t(registerStore.passwordError) : ''}
          placeholder={t('Пароль')}
        />
        <Input 
          className={cls.RegisterPage__input}
          type='password' 
          value={registerStore.passwordRepeat} 
          onChange={registerStore.setPasswordRepeat}
          error={registerStore.passwordRepeatError ? t(registerStore.passwordRepeatError) : ''}
          placeholder={t('Повторите пароль')}
        />
        <Button
          className={cls['RegisterPage__sign-in']}
          theme={ButtonTheme.CLEAR}
          onClick={toLogin}
          type='button'
        >
          {t('Войти')}
        </Button>
        <Button 
          className={cls.RegisterPage__btn}
          type='submit'
        >
          {t('Зарегистрироваться')}
        </Button>
      </form>
    </div>
  );
};

export default observer(RegisterPage);
