import { Role } from '@entities/User';
import BugIcon from '@shared/ui/icons/BugIcon';
import AccessComponent from '@widgets/AccessComponent/AccessComponent';
import LangSwitcher from '@widgets/LangSwitcher';
import ThemeSwitcher from '@widgets/ThemeSwitcher';

import SignIn from '../SignIn';
import cls from './Actions.module.scss';

const Actions = () => {
  return (
    <div className={cls.Actions}>
      <LangSwitcher className={cls.Actions__item} />
      <ThemeSwitcher className={cls.Actions__item} />
      <AccessComponent roles={[Role.guest, Role.customer]}>
        <BugIcon className={cls.Actions__item} />
      </AccessComponent>
      <SignIn className={cls.Actions__item} />
    </div>
  );
};

export default Actions;
