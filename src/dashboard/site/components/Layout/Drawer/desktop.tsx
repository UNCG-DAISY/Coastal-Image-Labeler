import React from 'react'
import Hidden from '@material-ui/core/Hidden'
import Drawer from '@material-ui/core/Drawer'
import { makeStyles } from '@material-ui/core/styles'
import { uiConstants } from '../../Constants'
import { theme } from '../../theme'
import { Divider } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: uiConstants.drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
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
        <div className={classes.toolbar} />
        <Divider />
        {props.children}
      </Drawer>
    </Hidden>
  )
}

export default DesktopDrawer
