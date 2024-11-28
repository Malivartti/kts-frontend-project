import './styles/index.scss';
import '@shared/configs/mobx';
import '@shared/configs/i18n/i18n';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

import RootLayout from '@widgets/RootLayout';
import { CookiesProvider } from 'react-cookie';
import { SkeletonTheme } from 'react-loading-skeleton';
import { HashRouter } from 'react-router-dom';

import AppRouter from './providers/AppRouter';
import ErrorBoundary from './providers/ErrorBoundary';
import ThemeProvider from './providers/ThemeProvider';

function App() {
  return (
    <HashRouter>
      <ErrorBoundary>
        <CookiesProvider>
          <ThemeProvider>
            <SkeletonTheme
              baseColor="var(--skeleton-base-color)"
              highlightColor="var(--skeleton-highlight-color)"
            >
              <RootLayout>
                <AppRouter />
              </RootLayout>
            </SkeletonTheme>
          </ThemeProvider>
        </CookiesProvider>
      </ErrorBoundary>
    </HashRouter>
  );
}

export default App;
