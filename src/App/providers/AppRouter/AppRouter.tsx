import { AppRoutePages, useAccessPages } from '@shared/configs/router';
import { observer } from 'mobx-react-lite';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  const accessPages = useAccessPages(AppRoutePages);

  return (
    <Suspense>
      <Routes>
        {
          ...accessPages.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={element}
            />
          ))
        }
      </Routes>
    </Suspense>
  );
};

export default observer(AppRouter);