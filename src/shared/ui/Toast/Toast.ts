import { toast } from 'react-toastify';

import cls from './Toast.module.scss';

const Toast = (message: string, type: 'error' | 'success') => {
  toast(message, {
    position: 'top-center',
    type,
    className: cls.Toast,
  });
};

export default Toast;
