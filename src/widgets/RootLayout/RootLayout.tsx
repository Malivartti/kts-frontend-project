import { useTheme } from '@app/providers/ThemeProvider';
import { useBagStoreInit } from '@shared/stores/BagStore';
import { useQueryParamsStoreInit } from '@shared/stores/QueryParamsStore';
import { useUserStoreInit } from '@shared/stores/UserStore';
import Sidebar from '@widgets/Sidebar';
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
  useBagStoreInit();

  return (
    <div className={classNames('app', theme)}>
      <Header />
      <Sidebar />
      <ContainerLayout>
        <ToastContainer />
        {children}
      </ContainerLayout>
    </div>
  );
};

export default RootLayout;
