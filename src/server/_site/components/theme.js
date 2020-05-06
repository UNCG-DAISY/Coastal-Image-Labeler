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
      'Roboto Mono','monospace'
    ].join(','),
  },
  palette: {
    type:'dark',
    primary: {
      main: '#556cd6',
    },
    customColors:{
      mainGreen:'#7db343'
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    // background: {
    //   default: '#fff',
    // },
  },
});

export default theme;
