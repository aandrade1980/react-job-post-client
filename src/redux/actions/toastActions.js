import { toast } from 'react-toastify';

export const toastMessage = (
  text,
  show = true,
  autoClose = 2000,
  draggable = false,
  position = toast.POSITION.TOP_CENTER,
  type = 'success'
) => dispatch => {
  const toastOptions = {
    show,
    autoClose,
    draggable,
    position,
    type,
    text
  };

  dispatch({
    type: 'SHOW_TOAST',
    payload: toastOptions
  });
};
