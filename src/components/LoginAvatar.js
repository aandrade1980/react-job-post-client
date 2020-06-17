import React from 'react';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

// Material UI
import Tooltip from '@material-ui/core/Tooltip';

const LoginAvatar = ({ user, logoutUser }) => {
  const handleClick = () => logoutUser();

  return (
    <Tooltip title={user.full_name}>
      <div
        style={{ marginLeft: 'auto', cursor: 'pointer' }}
        onClick={handleClick}
      >
        <img
          style={styles.img}
          src={user && user.avatar_url}
          alt={user.full_name}
        />
      </div>
    </Tooltip>
  );
};

const styles = {
  img: {
    height: 42,
    width: 'auto',
    borderRadius: '50%'
  }
};

const mapStateToProps = ({ user: { user } }) => ({
  user
});

export default connect(mapStateToProps, { logoutUser })(LoginAvatar);
