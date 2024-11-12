import classNames from 'classnames';
import { FC, ReactNode } from 'react';

import { useTheme } from '@/App/providers/ThemeProvider';
import { useQueryParamsStoreInit } from '@/stores/QueryParamsStore';

import ContainerLayout from '../ContainerLayout';
import Header from '../Header';

type RootLayoutProps = {
  children?: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  useQueryParamsStoreInit();

  return (
    <div className={classNames('app', theme)}>
      <Header />
      <ContainerLayout>
        {children}
      </ContainerLayout>
    </div>
  );
};

export default RootLayout;
