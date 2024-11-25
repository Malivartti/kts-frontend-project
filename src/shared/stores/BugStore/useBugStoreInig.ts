import { reaction, toJS } from 'mobx';
import { useEffect } from 'react';

import rootStore from '../RootStore';

const LOCAL_STORAGE_KEY_BUG = 'bug';

export const useBugStoreInit = () => {
  const bug = localStorage.getItem(LOCAL_STORAGE_KEY_BUG);

  if (bug) {
    rootStore.bug.setBug(JSON.parse(bug));
  }

  useEffect(() => {
    const reactionDisposer = reaction(
      () => rootStore.bug.bug,
      bug => {
        localStorage.setItem(LOCAL_STORAGE_KEY_BUG, JSON.stringify(toJS(bug)));
      }
    );

    return () => {
      reactionDisposer();
    };
  });
};