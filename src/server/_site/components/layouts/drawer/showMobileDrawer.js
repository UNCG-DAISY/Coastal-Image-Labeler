import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {uiConstants} from '../../constants'

const useStyles = makeStyles(theme => ({
    drawerPaper: {
      width: uiConstants.drawerWidth,
    }
}));

function ShowMobileDrawer(props) {
    const classes = useStyles();
    const { container } = props;
    const theme = useTheme();
  

    
    return (
        <Hidden smUp implementation="css">
          <SwipeableDrawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.handleDrawerToggle}
            onOpen={props.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {props.children}  
          </SwipeableDrawer>
        </Hidden>
    )
}

ShowMobileDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  };

export default ShowMobileDrawer;