import { useTheme } from '@app/providers/ThemeProvider';
import { useBugStoreInit } from '@shared/stores/BugStore/useBugStoreInig';
import { useQueryParamsStoreInit } from '@shared/stores/QueryParamsStore';
import { useUserStoreInit } from '@shared/stores/UserStore';
import classNames from 'classnames';
import { FC, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import ContainerLayout from '../ContainerLayout';
import Header from '../Header';

type RootLayoutProps = {
  children?: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  useQueryParamsStoreInit();
  useUserStoreInit();
  useBugStoreInit();

  return (
    <div className={classNames('app', theme)}>
      <Header />
      <ContainerLayout>
        <ToastContainer />
        {children}
      </ContainerLayout>
    </div>
  );
};

export default RootLayout;
