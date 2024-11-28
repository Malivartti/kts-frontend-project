import ProfileStore from '@shared/stores/ProfileStore';
import Button from '@shared/ui/Button';
import Input from '@shared/ui/Input';
import Modal from '@widgets/Modal';
import { observer } from 'mobx-react-lite';
import { FC, FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import cls from './ProfileModal.module.scss';

type ProfileModalProps = {
  profileStore: ProfileStore;
  isShow: boolean;
  setIsShow: (value: boolean) => void;
}

const ProfileModal: FC<ProfileModalProps> = ({ profileStore, isShow, setIsShow }) => {
  const { t } = useTranslation('profile');

  const onSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    profileStore.updateUser();
  }, [profileStore]);

  return (
    <Modal isShow={isShow} setIsShow={setIsShow}>
      <form className={cls.ProfileModal__form} onSubmit={onSubmit} noValidate>
        <Input
          className={cls.ProfileModal__input}
          type="text" 
          value={profileStore.name} 
          onChange={profileStore.setName}
          error={profileStore.nameError ? t(profileStore.nameError) : ''}
          placeholder={t('Новое имя')}
        />
        <Button className={cls.ProfileModal__btn} type='submit'>{t('Сохранить')}</Button>
      </form>
    </Modal>
  );
};

export default observer(ProfileModal);
