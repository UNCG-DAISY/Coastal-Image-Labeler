// Drawer for mobile users

import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { uiConstants } from '../../Constants'

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: uiConstants.drawerWidth,
  },
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
        {props.children}
      </SwipeableDrawer>
    </Hidden>
  )
}

export default MobileDrawer
