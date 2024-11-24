import { Role } from '@entities/User';
import rootStore from '@shared/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { FC, ReactNode } from 'react';

type AccessComponentProps = {
  roles: Role[];
  children: ReactNode;
}

const AccessComponent: FC<AccessComponentProps> = ({ roles, children }) => {
  let userRole = rootStore.user.user?.role;
  if (userRole === undefined) {
    userRole = Role.guest;
  }

  if (roles.includes(userRole)) {
    return children;
  }
};

export default observer(AccessComponent);
