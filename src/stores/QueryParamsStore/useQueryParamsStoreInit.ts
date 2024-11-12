

import { useLocation } from 'react-router-dom';

import rootStore from '../RootStore';


export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();
  rootStore.query.setSearch(search);
};