// Drawer for desktop users

import React from 'react';
import PropTypes from 'prop-types';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {uiConstants} from '../../constants'

const useStyles = makeStyles(theme => ({
    drawerPaper: {
      width: uiConstants.drawerWidth,
    }
}));

function ShowDesktopDrawer(props) {
    const classes = useStyles();
    return (
        <Hidden xsDown implementation="css">
            <Drawer
                classes={{
                paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
            >
                {props.children}        
            </Drawer>
        </Hidden>
    )
}

ShowDesktopDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  };

export default ShowDesktopDrawer;