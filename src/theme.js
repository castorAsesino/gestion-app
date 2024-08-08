import { createTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: 'rgb(220, 0, 78)',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#ebebeb',
    },
    info:{
      main: 'rgb(220, 0, 78)',
    },

    
  },
});

export default theme;
