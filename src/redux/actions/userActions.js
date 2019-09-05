// Netlify
import netlifyIdentity from "netlify-identity-widget";

export const loginUser = () => dispatch => {
  if (netlifyIdentity && netlifyIdentity.currentUser()) {
    const {
      app_metadata,
      created_at,
      confirmed_at,
      email,
      id,
      user_metadata
    } = netlifyIdentity.currentUser();
    dispatch({
      type: "SET_USER",
      payload: {
        ...app_metadata,
        created_at,
        confirmed_at,
        email,
        id,
        ...user_metadata
      }
    });
  }
};

export const logoutUser = () => async dispatch => {
  netlifyIdentity.currentUser() && (await netlifyIdentity.logout());
  dispatch({
    type: "SET_USER",
    payload: null
  });
};
