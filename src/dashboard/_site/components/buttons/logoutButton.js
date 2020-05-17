import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, red } from '@material-ui/core/colors';
import theme from '../theme';

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[200],
    },
  },
}))(Button);

const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
}));

export default function LogoutButton(props) {
  const classes = useStyles();

  return (
    <ColorButton variant="contained" color="secondary" className = {classes.margin}>
        Logout
    </ColorButton>
  );
}
