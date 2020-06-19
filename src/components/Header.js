import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Badge } from '@material-ui/core';
import {
  Home,
  OpenInNew,
  FormatListBulleted,
  FilterList
} from '@material-ui/icons';

// Redux
import { connect } from 'react-redux';
import { openModal } from '../redux/actions/jobActions';

// Components
import CustomButton from './CustomButton';
import LoginAvatar from './LoginAvatar';

import { components } from '../util/Contants';

const styles = theme => ({
  ...theme.appBar
});

const Header = ({ openModal, classes, title, jobs }) => {
  const handleClick = cmp =>
    openModal({ show: true, edit: false, component: components[cmp] });

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <h1 className={classes.h1}>
          <Badge color="secondary" badgeContent={jobs && jobs.length}>
            <Link to="/" className={classes.a} style={{ marginTop: '-5px' }}>
              {title}
            </Link>
          </Badge>
        </h1>
        <nav>
          <CustomButton title="Home" component={Link} to="/">
            <Home className={classes.svg_white} />
          </CustomButton>
          <CustomButton
            title="New Job"
            onClick={() => handleClick('newJobForm')}
          >
            <OpenInNew className={classes.svg_white} />
          </CustomButton>
          <CustomButton title="Categories" component={Link} to="/Categories">
            <FormatListBulleted className={classes.svg_white} />
          </CustomButton>
          <CustomButton title="Filter" onClick={() => handleClick('filter')}>
            <FilterList className={classes.svg_white} />
          </CustomButton>
        </nav>
        <LoginAvatar />
      </Toolbar>
    </AppBar>
  );
};

const MapStateToProps = ({ job: { jobs } }) => ({
  jobs
});

export default connect(MapStateToProps, { openModal })(
  withStyles(styles)(Header)
);
