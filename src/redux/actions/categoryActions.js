import { API_URL } from "../../util/Contants";

export const getAllCategories = () => dispatch =>
  fetch(`${API_URL}/categories`)
    .then(res => res.json())
    .then(categories =>
      dispatch({
        type: "SET_CATEGORIES",
        payload: categories
      })
    );

export const postCategory = categoryName => async dispatch => {
  try {
    dispatch({
      type: "TOGGLE_SPINNER",
      payload: { loading: true, success: false }
    });
    const response = await fetch(`${API_URL}/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: categoryName })
    });
    if (response.status === 200) {
      const newCategory = await response.json();
      dispatch({
        type: "ADD_CATEGORY",
        payload: newCategory
      });
      dispatch({
        type: "TOGGLE_SPINNER",
        payload: { loading: false, success: true }
      });
      setTimeout(
        () =>
          dispatch({
            type: "TOGGLE_SPINNER",
            payload: { loading: false, success: false }
          }),
        1500
      );
    }
  } catch (error) {
    console.log("Error posting category: ", error);
  }
};

export const deleteCategory = categoryId => async dispatch => {
  const response = await fetch(`${API_URL}/category/${categoryId}`, {
    method: "DELETE"
  });
  response.status === 200 &&
    dispatch({
      type: "DELETE_CATEGORY",
      payload: categoryId
    });
};
