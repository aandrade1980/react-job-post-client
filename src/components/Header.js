import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// MUI
import HomeIcon from "@material-ui/icons/Home";
import NewIcon from "@material-ui/icons/OpenInNew";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";

// Redux
import { connect } from "react-redux";
import { showModal } from "../redux/actions/jobActions";

// Components
import CustomButton from "./CustomButton";

class Header extends React.Component {
  handleClick = () => this.props.showModal(true);

  render() {
    return (
      <HeaderContainer>
        <div>
          <h1>{this.props.title}</h1>
          <nav>
            <CustomButton title="Home" component={Link} to="/">
              <HomeIcon />
            </CustomButton>
            <CustomButton title="New Job" onClick={this.handleClick}>
              <NewIcon />
            </CustomButton>
            <CustomButton title="Categories" component={Link} to="/Categories">
              <FormatListBulletedIcon />
            </CustomButton>
          </nav>
        </div>
      </HeaderContainer>
    );
  }
}

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
  color: whitesmoke;
  div {
    background-color: #3f51b5;
    display: flex;
    justify-content: flex-start;
    height: 75px;
    align-items: center;
    h1 {
      margin: 0 45px;
    }
  }
  svg {
    color: whitesmoke;
  }
`;

export default connect(
  null,
  { showModal }
)(Header);
