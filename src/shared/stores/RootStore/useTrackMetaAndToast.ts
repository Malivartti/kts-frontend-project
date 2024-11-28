import toast from '@shared/ui/toast';
import { TFunction } from 'i18next';
import { reaction } from 'mobx';
import { useEffect } from 'react';

type Store = {
  isError: boolean,
  isSuccess: boolean,
  message: string,
}

type Args = {
  t: TFunction<'translation', undefined>;
  store: Store;
  onError?: () => void;
  onSuccess?: () => void;
}

export const useTrackMetaAndToast = ({
  t,
  store,
  onError,
  onSuccess,
}: Args): void => {
  useEffect(() => {
    const reactionDisposer = reaction(
      () => store.message,
      (message) => {
        if (store.isError) {
          onError?.();
          toast(t(message), 'error');
        }
        if (store.isSuccess) {
          onSuccess?.();
          if (!message) return;
          toast(t(message), 'success');
        }
      }
    );
  
    return () => {
      reactionDisposer();
    };
  }, [ t, store, onError, onSuccess ]);
};
