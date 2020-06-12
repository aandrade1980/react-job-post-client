import { API_URL } from '../../util/Contants';

import { toastMessage } from './toastActions';

export const getAllCategories = () => dispatch =>
  fetch(`${API_URL}/categories`)
    .then(res => res.json())
    .then(categories =>
      dispatch({
        type: 'SET_CATEGORIES',
        payload: categories
      })
    );

export const postCategory = categoryName => async dispatch => {
  try {
    dispatch({
      type: 'TOGGLE_SPINNER',
      payload: { loading: true }
    });
    const response = await fetch(`${API_URL}/category`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: categoryName })
    });
    if (response.status === 200) {
      const newCategory = await response.json();
      dispatch({
        type: 'ADD_CATEGORY',
        payload: newCategory
      });
      dispatch({
        type: 'TOGGLE_SPINNER',
        payload: { loading: false, success: true }
      });
      // Set back the button to the normal color
      setTimeout(
        () =>
          dispatch({
            type: 'TOGGLE_SPINNER',
            payload: { success: false }
          }),
        1500
      );
    }
    if (response.status === 422) {
      dispatch({
        type: 'TOGGLE_SPINNER',
        payload: { loading: false, success: false }
      });
      const error = await response.json();
      console.log('Error => ', error);

      dispatch(
        toastMessage(error.message, true, false, false, 'top-center', 'error')
      );
    }
  } catch (error) {
    console.log('Error posting category: ', error);
  }
};

export const deleteCategory = categoryId => async dispatch => {
  const response = await fetch(`${API_URL}/category/${categoryId}`, {
    method: 'DELETE'
  });
  if (response.status === 200) {
    dispatch({
      type: 'DELETE_CATEGORY',
      payload: categoryId
    });
    dispatch(toastMessage('Category Deleted!'));
  }
};
