import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, red } from '@material-ui/core/colors';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import theme from '../theme';

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red['A700'],
    },
  },
}))(ListItem);

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    link: {
      textDecoration: 'none',
      color:'inherit',
      margin: theme.spacing(1),
    },
}));

export default function LogoutListButton(props) {
  const classes = useStyles();

  return (
    <a href='/logout' className= {classes.link} key='Logout'>
        <ColorButton button >
            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
            <ListItemText primary='Logout' />
        </ColorButton>
    </a>
  );
}
