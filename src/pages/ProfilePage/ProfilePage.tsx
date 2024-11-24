import ProfileStore from '@shared/stores/ProfileStore';
import rootStore from '@shared/stores/RootStore';
import Button from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import { reaction } from 'mobx';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { MouseEvent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import cls from './ProfilePage.module.scss';
import ProfileModal from './ui/ProfileModal';


const ProfilePage = () => {
  const profileStore = useLocalObservable(() => new ProfileStore());
  const [isShow, setIsSnow] = useState<boolean>(false);
  const { t } = useTranslation('profile');

  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsSnow(true);
  }, []);

  useEffect(() => {
    const reactionDisposer = reaction(
      () => ({ isError: rootStore.user.isError, isSuccess: rootStore.user.isSuccess }),
      ({ isError, isSuccess }) => {
        if (isError) {
          toast(t(rootStore.user.error), {
            position: 'top-center',
            type: 'error',
            className: cls.ProfilePage__toast,
          });
        }
        if (isSuccess) {
          toast(t('Сохранено успешно'), {
            position: 'top-center',
            type: 'success',
            className: cls.ProfilePage__toast,
          });
        }
      }
    );
    return () => {
      reactionDisposer();
    };
  }, [t]);
  
  return (
    <div className={cls.ProfilePage}>
      <ProfileModal profileStore={profileStore} isShow={isShow} setIsShow={setIsSnow} />
      <div className={cls.ProfilePage__container}>
        <Text className={cls.ProfilePage__title} tag='h1' view='title' >
          {t('Профиль')}
        </Text>
        <div
          className={cls.ProfilePage__avatar}
          style={{ backgroundImage: `url(${rootStore.user.user.avatar})` }}
        ></div>
        <div className={cls.ProfilePage__row}>
          <Text className={cls.ProfilePage__} tag='div' view='p-20' >
            {t('Имя')}
          </Text>
          <Text className={cls.ProfilePage__} tag='div' view='p-20'>
            {rootStore.user.user.name}
          </Text>
        </div>
        <div className={cls.ProfilePage__row}>
          <Text className={cls.ProfilePage__} tag='div' view='p-20' >
            {t('Почта')}
          </Text>
          <Text className={cls.ProfilePage__} tag='div' view='p-20'>
            {rootStore.user.user.email}
          </Text>
        </div>
        <Button className={cls.ProfilePage__btn} type='button' onClick={onClick}>
          {t('Изменить')}
        </Button>
      </div>
    </div>
  );
};

export default observer(ProfilePage);