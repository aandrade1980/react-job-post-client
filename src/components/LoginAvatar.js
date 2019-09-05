import React from "react";

const LoginAvatar = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log("Current user => ", currentUser.avatar_url);

  return (
    <div style={{ marginLeft: "auto" }}>
      <img style={styles.img} src={currentUser.avatar_url} alt="User Avatar" />
    </div>
  );
};

const styles = {
  img: {
    height: 55,
    width: "auto",
    borderRadius: "50%",
    border: "solid 1px"
  }
};

export default LoginAvatar;
