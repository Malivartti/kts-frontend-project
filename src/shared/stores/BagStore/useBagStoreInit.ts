import { reaction, toJS } from 'mobx';
import { useEffect } from 'react';

import rootStore from '../RootStore';

const LOCAL_STORAGE_KEY_BAG = 'bag';

export const useBagStoreInit = () => {
  const bag = localStorage.getItem(LOCAL_STORAGE_KEY_BAG);

  if (bag) {
    rootStore.bag.setBag(JSON.parse(bag));
  }

  useEffect(() => {
    const reactionDisposer = reaction(
      () => rootStore.bag.bag,
      bag => {
        localStorage.setItem(LOCAL_STORAGE_KEY_BAG, JSON.stringify(toJS(bag)));
      }
    );

    return () => {
      reactionDisposer();
    };
  });
};