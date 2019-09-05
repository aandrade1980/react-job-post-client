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

    console.log("Current User => ", netlifyIdentity.currentUser());

    dispatch({
      type: "SET_USER",
      payload: netlifyIdentity.currentUser()
    });

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        ...app_metadata,
        created_at,
        confirmed_at,
        email,
        id,
        ...user_metadata
      })
    );
  }
};

export const logoutUser = () => dispatch => {
  localStorage.removeItem("currentUser");
  dispatch({
    type: "SET_USER",
    payload: null
  });
};
