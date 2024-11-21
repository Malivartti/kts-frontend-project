import BugIcon from '@shared/ui/icons/BugIcon';
import UserIcon from '@shared/ui/icons/UserIcon';
import LangSwitcher from '@widgets/LangSwitcher';
import ThemeSwitcher from '@widgets/ThemeSwitcher';

import cls from './Actions.module.scss';

const Actions = () => {
  return (
    <div className={cls.Actions}>
      <LangSwitcher className={cls.Actions__item} />
      <ThemeSwitcher className={cls.Actions__item} />
      <BugIcon className={cls.Actions__item}/>
      <UserIcon className={cls.Actions__item}/>
    </div>
  );
};

export default Actions;
