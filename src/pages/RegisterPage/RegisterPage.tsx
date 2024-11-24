import { AppRouteUrls } from '@shared/configs/router';
import RegisterStore from '@shared/stores/RegisterStore';
import rootStore from '@shared/stores/RootStore';
import Button, { ButtonTheme } from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Text from '@shared/ui/Text';
import { reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { FormEvent, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import cls from './RegisterPage.module.scss';

const RegisterPage = () => {
  const registerStore = useLocalObservable(() => new RegisterStore());
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    registerStore.register();
  }, [registerStore]);

  const toLogin = useCallback(() => {
    navigate(AppRouteUrls.login.create());
  }, [navigate]);


  useEffect(() => {
    const reactionDisposer = reaction(
      () => ({ isError: rootStore.user.isError, isSuccess: rootStore.user.isSuccess }),
      ({ isError, isSuccess }) => {
        if (isError) {
          toast(t(rootStore.user.error), {
            position: 'top-center',
            type: 'error',
            className: cls.RegisterPage__toast,
          });
        }
        if (isSuccess) {
          navigate(AppRouteUrls.root);
          toast(t('Успешная регистрация'), {
            position: 'top-center',
            type: 'success',
            className: cls.RegisterPage__toast,
          });
        }
      }
    );

    return () => {
      reactionDisposer();
    };
  }, [navigate, t]);

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
          placeholder={t('Фото')}
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
          {t('Зарегистрироваться')}
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
