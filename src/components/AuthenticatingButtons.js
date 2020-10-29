import React from 'react';
import styled from 'styled-components';

// MUI
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  ...theme.authenticatingButtons
});

const AuthenticatingButtons = ({ netlifyIdentity, classes }) => {
  const handleAuthentication = action => netlifyIdentity.open(action);
  const buttons = [
    { action: 'login', text: 'login' },
    { action: 'signup', text: 'signup' }
  ];

  return (
    <Container>
      <Ul>
        {buttons.map((button, index) => (
          <Li key={index}>
            <Button
              variant="contained"
              className={classes.buttons}
              onClick={() => handleAuthentication(`${button.action}`)}
              size="large"
            >
              {button.text}
            </Button>
          </Li>
        ))}
      </Ul>
    </Container>
  );
};

const Container = styled.div`
  width: fit-content;
  margin: 350px auto;
`;

const Ul = styled.ul`
  display: flex;
`;

const Li = styled.li`
  list-style: none;
  :first-child {
    margin-right: 35px;
  }
`;

export default withStyles(styles)(AuthenticatingButtons);
