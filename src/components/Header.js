import React from "react";
import styled from "styled-components";

function Header({ title }) {
  return (
    <HeaderContainer>
      <h1>{title}</h1>
    </HeaderContainer>
  );
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

export default Header;
