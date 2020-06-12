import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import {uiConstants} from '../constants'
import theme from '../theme';

const useStyles = makeStyles(theme => ({
    appBar: {
        // [theme.breakpoints.up('sm')]: {
        //   width: `calc(100% - ${drawerWidth}px)`,
        //   marginLeft: drawerWidth,
        // },
        //backgroundColor:theme.palette.customColors.mainGreen,
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
    },
}));

function MyAppBar(props) {
    const classes = useStyles();
    const { container } = props;
    const theme = useTheme();
  

    
    return (
        <AppBar position="fixed" className={classes.appBar} color = "primary">
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={props.handleDrawerToggle}
                className={classes.menuButton}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                {props?.pageTitle || 'Coastal Image Labeler'}
            </Typography>
            </Toolbar>
        </AppBar>
    )
}

MyAppBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
  };

export default MyAppBar;