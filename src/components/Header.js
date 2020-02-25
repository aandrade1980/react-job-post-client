import React from "react";
import { Link } from "react-router-dom";

// MUI
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar } from "@material-ui/core";
import {
  Home,
  OpenInNew,
  FormatListBulleted,
  FilterList
} from "@material-ui/icons";

// Redux
import { connect } from "react-redux";
import { openModal } from "../redux/actions/jobActions";

// Components
import CustomButton from "./CustomButton";
import LoginAvatar from "./LoginAvatar";

import { components } from "../util/Contants";

const styles = theme => ({
  ...theme.appBar
});

const Header = ({ openModal, classes, title }) => {
  const handleClick = cmp =>
    openModal({ show: true, edit: false, component: components[cmp] });

  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar>
        <h1 className={classes.h1}>
          <Link to="/" className={classes.a}>
            {title}
          </Link>
        </h1>
        <nav>
          <CustomButton title="Home" component={Link} to="/">
            <Home className={classes.svg_white} />
          </CustomButton>
          <CustomButton
            title="New Job"
            onClick={() => handleClick("newJobForm")}
          >
            <OpenInNew className={classes.svg_white} />
          </CustomButton>
          <CustomButton title="Categories" component={Link} to="/Categories">
            <FormatListBulleted className={classes.svg_white} />
          </CustomButton>
          <CustomButton title="Filter" onClick={() => handleClick("filter")}>
            <FilterList className={classes.svg_white} />
          </CustomButton>
        </nav>
        <LoginAvatar />
      </Toolbar>
    </AppBar>
  );
};

export default connect(null, { openModal })(withStyles(styles)(Header));
