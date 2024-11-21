import '@/styles/index.scss';
import '@/configs/mobx';
import '@/configs/i18n/i18n';
import 'react-loading-skeleton/dist/skeleton.css';

import { SkeletonTheme } from 'react-loading-skeleton';
import { BrowserRouter } from 'react-router-dom';

import RootLayout from '@/widgets/RootLayout';

import AppRouter from './providers/AppRouter';
import ErrorBoundary from './providers/ErrorBoundary';
import ThemeProvider from './providers/ThemeProvider';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
