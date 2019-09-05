// Netlify
import netlifyIdentity from "netlify-identity-widget";

export const loginUser = () => dispatch => {
  if (netlifyIdentity && netlifyIdentity.currentUser()) {
    dispatch({
      type: "SET_USER",
      payload: netlifyIdentity.currentUser()
    });
  }
};

export const logoutUser = () => dispatch =>
  dispatch({
    type: "SET_USER",
    payload: null
  });
