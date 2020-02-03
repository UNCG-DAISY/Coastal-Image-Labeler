import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {uiConstants} from '../constants'
//Adds swiping
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

//Desktop drawer display
import ShowDesktopDrawer from './drawer/showDesktopDrawer'
import ShowMobileDrawer from './drawer/showMobileDrawer'
import MyAppBar from './appBar'

const drawerWidth = uiConstants.drawerWidth;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyAppBar {...props?.AppBar?.props} handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        {/* Phone mode */}
        <ShowMobileDrawer handleDrawerToggle ={handleDrawerToggle} mobileOpen={mobileOpen} container={container}>
          {props.SideContent}  
        </ShowMobileDrawer>

        {/* Desktop mode */}
        <ShowDesktopDrawer>
          {props.SideContent}
        </ShowDesktopDrawer>    
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}   
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;
