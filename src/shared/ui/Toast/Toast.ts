import { toast as reactToast } from 'react-toastify';

import cls from './toast.module.scss';

const toast = (message: string, type: 'error' | 'success') => {
  reactToast(message, {
    position: 'top-center',
    type,
    className: cls.toast,
  });
};

export default toast;
