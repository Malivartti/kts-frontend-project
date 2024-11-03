import '@/styles/index.scss';

import classNames from 'classnames';

import Header from '@/widgets/Header';

import { AppRouter } from './providers/AppRouter';
import { useTheme } from './providers/ThemeProvider';

function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', theme)}>
      <Header />
      <div className="container">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
