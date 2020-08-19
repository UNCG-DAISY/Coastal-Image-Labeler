import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import { uiConstants } from '../../Constants'

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: uiConstants.drawerWidth,
  },
}))

function DesktopDrawer(props) {
  const classes = useStyles()
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

export default DesktopDrawer
