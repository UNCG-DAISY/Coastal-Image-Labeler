import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';;
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {uiConstants} from '../constants'
//Adds swiping
// import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

//Desktop drawer display
import ShowDesktopDrawer from './drawer/showDesktopDrawer'
import ShowMobileDrawer from './drawer/showMobileDrawer'
import MyAppBar from './appBar'
import DrawerContent from './DrawerContent'

const drawerWidth = uiConstants.drawerWidth;

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  //const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {
    // SideContent,
    pageTitle,
    user
  } = props

  //console.log(pageTitle)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <MyAppBar pageTitle={pageTitle} handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* Phone mode */}
        <ShowMobileDrawer handleDrawerToggle ={handleDrawerToggle} mobileOpen={mobileOpen} container={container}>
          <DrawerContent user={user}/> 
        </ShowMobileDrawer>

        {/* Desktop mode */}
        <ShowDesktopDrawer>
          <DrawerContent user={user}/>
        </ShowDesktopDrawer>    
      </nav>
      
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}   
      </main>
    </div>
  );
}

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

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default ResponsiveDrawer;
