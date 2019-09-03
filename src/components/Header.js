import React from "react";
import { Link } from "react-router-dom";

// MUI
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import HomeIcon from "@material-ui/icons/Home";
import NewIcon from "@material-ui/icons/OpenInNew";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

// Redux
import { connect } from "react-redux";
import { openModal } from "../redux/actions/jobActions";

// Components
import CustomButton from "./CustomButton";

const styles = theme => ({
  ...theme.appBar
});

class Header extends React.Component {
  handleClick = () => this.props.openModal({ show: true, edit: false });

  render() {
    console.log("props => ", this.props);
    const { classes, title } = this.props;
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
              <HomeIcon className={classes.svg_white} />
            </CustomButton>
            <CustomButton title="New Job" onClick={this.handleClick}>
              <NewIcon className={classes.svg_white} />
            </CustomButton>
            <CustomButton title="Categories" component={Link} to="/Categories">
              <FormatListBulletedIcon className={classes.svg_white} />
            </CustomButton>
          </nav>
        </Toolbar>
      </AppBar>
    );
  }
}

export default connect(
  null,
  { openModal }
)(withStyles(styles)(Header));
