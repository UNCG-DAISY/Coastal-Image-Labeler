// The file that contains the theme of the site

import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    //fontSize: 24,
    fontFamily: [
      // '-apple-system',
      // 'BlinkMacSystemFont',
      // '"Segoe UI"',
      // 'Roboto',
      // '"Helvetica Neue"',
      // 'Arial',
      // 'sans-serif',
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
      //'Roboto Mono'
      //'monospace'
      'Roboto Mono'
      //'Roboto'
    ].join(','),
  },
  palette: {
    type:'dark',
    primary: {
      main: '#556cd6',
    },
    customColors:{
      mainGreen:'#7db343',
      cyan:'#8be9fd',
      green: '#50fa7b',
      orange: '#ffb86c',
      pink: '#ff79c6',
      purple: '#bd93f9',
      red: '#ff5555',
      yellow:'#f1fa8c'
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default:'#282A36',
    //   paper:'#353743'
     
    // },
  },
});

export default theme;
