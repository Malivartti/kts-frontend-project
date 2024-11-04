import '@/styles/index.scss';

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
          <RootLayout>
            <AppRouter />
          </RootLayout>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
