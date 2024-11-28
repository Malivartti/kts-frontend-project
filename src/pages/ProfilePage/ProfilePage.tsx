import ProfileStore from '@shared/stores/ProfileStore';
import rootStore, { useTrackMetaAndToast } from '@shared/stores/RootStore';
import Button from '@shared/ui/Button';
import Text from '@shared/ui/Text';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { MouseEvent, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

  useTrackMetaAndToast({ t, store: rootStore.user });
  
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