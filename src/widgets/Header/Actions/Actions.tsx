import BugIcon from '@/components/icons/BugIcon';
import UserIcon from '@/components/icons/UserIcon';
import ThemeSwitcher from '@/widgets/ThemeSwitcher';

import cls from './Actions.module.scss';

const Actions = () => {
  return (
    <div className={cls.Actions}>
      <ThemeSwitcher className={cls.Actions__item} />
      <BugIcon className={cls.Actions__item}/>
      <UserIcon className={cls.Actions__item}/>
    </div>
  );
};

export default Actions;
