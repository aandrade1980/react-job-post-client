import { createTheme } from '@mui/material';
import { blue, green, teal } from '@mui/material/colors';

const themeFile = {
  palette: {
    primary: blue
  },
  appBar: {
    a: {
      color: 'whitesmoke',
      textDecoration: 'none'
    },
    h1: {
      marginRight: 45,
      marginLeft: 45
    },
    svg_white: {
      color: 'whitesmoke'
    }
  },
  spinner: {
    successButton: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700]
      }
    },
    buttonProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12
    }
  },
  authenticatingButtons: {
    buttons: {
      backgroundColor: teal[400],
      color: 'white',
      '&:hover': {
        backgroundColor: teal[700]
      }
    }
  }
};

const theme = createTheme(themeFile);

export default theme;
