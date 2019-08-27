import React from "react";
import styled from "styled-components";

// Redux
import { connect } from "react-redux";
import { showModal } from "../redux/actions/jobActions";

class Header extends React.Component {
  handleClick = () => {
    this.props.showModal(true);
  };

  render() {
    return (
      <HeaderContainer>
        <h1>{this.props.title}</h1>
        <button onClick={this.handleClick}>NEW JOB!!!</button>
      </HeaderContainer>
    );
  }
}

const HeaderContainer = styled.header`
  background-color: #039be5;
  color: whitesmoke;
  display: flex;
  justify-content: center;
  height: 75px;
  position: sticky;
  top: 0;
  align-items: center;
`;

export default connect(
  null,
  { showModal }
)(Header);
