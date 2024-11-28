import { Role } from '@entities/User';
import rootStore from '@shared/stores/RootStore';
import AccessComponent from '@widgets/AccessComponent/AccessComponent';
import Badge from '@widgets/Badge';
import LangSwitcher from '@widgets/LangSwitcher';
import ThemeSwitcher from '@widgets/ThemeSwitcher';
import { observer } from 'mobx-react-lite';

import Bag from '../Bag';
import SignIn from '../SignIn';
import cls from './Actions.module.scss';

const Actions = () => {
  return (
    <div className={cls.Actions}>
      <LangSwitcher className={cls.Actions__item} />
      <ThemeSwitcher className={cls.Actions__item} />
      <AccessComponent roles={[Role.guest, Role.customer]}>
        <Badge count={rootStore.bag.bagCount} className={cls.Actions__item}>
          <Bag/>
        </Badge>
      </AccessComponent>
      <SignIn className={cls.Actions__item} />
    </div>
  );
};

export default observer(Actions);
