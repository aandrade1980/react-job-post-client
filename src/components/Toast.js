import React from 'react';

import { useSelector } from 'react-redux';

import { toast as toastify } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
  const toast = useSelector(state => state.toast);
  React.useEffect(() => {
    toastify.configure(toast);
    if (toast.show) {
      switch (toast.type) {
        case 'success':
          toastify.success(toast.text);
          break;
        case 'error':
          toastify.error(toast.text);
          break;
        default:
          toastify(toast.text);
          break;
      }
    }
  }, [toast]);

  return null;
};

export default Toast;
