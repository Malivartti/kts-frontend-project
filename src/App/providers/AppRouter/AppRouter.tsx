import { Route, Routes } from 'react-router-dom';

import { AppRoutePages } from '@/configs/router';

const AppRouter = () => {
  return (
    <Routes>
      {
        ...AppRoutePages.map(({path, element}) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))
      }
    </Routes>
  );
};

export default AppRouter;