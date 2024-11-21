import { AppRoutePages } from '@shared/configs/router';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    <Suspense>
      <Routes>
        {
          ...AppRoutePages.map(({ path, element }) => (
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

export default AppRouter;