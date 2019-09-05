import React from "react";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const LoginAvatar = ({ user, logoutUser }) => {
  const handleClick = () => logoutUser();

  return (
    <div
      style={{ marginLeft: "auto", cursor: "pointer" }}
      onClick={handleClick}
    >
      <img
        style={styles.img}
        src={user && user.avatar_url}
        alt={user.full_name}
      />
    </div>
  );
};

const styles = {
  img: {
    height: 42,
    width: "auto",
    borderRadius: "50%"
  }
};

const mapStateToProps = ({ user: { user } }) => ({
  user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(LoginAvatar);
