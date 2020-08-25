// Drawer for mobile users

import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { uiConstants } from '../../Constants'
import { theme } from '../../theme'
import { Divider } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: uiConstants.drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}))

function MobileDrawer(props) {
  const classes = useStyles()
  const { container } = props
  const theme = useTheme()

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
        <div className={classes.toolbar} />
        <Divider />
        {props.children}
      </SwipeableDrawer>
    </Hidden>
  )
}

export default MobileDrawer
