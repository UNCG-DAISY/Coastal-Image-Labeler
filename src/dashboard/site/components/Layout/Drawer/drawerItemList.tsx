import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Divider from '@material-ui/core/Divider'
// import SendIcon from '@material-ui/icons/Send'
import { DrawerItem } from './drawerItem'
// import { uiConstants } from '../../Constants'

// const drawerWidth = uiConstants.drawerWidth
export function DrawerItemContent(navItems = { center: [], right: [] }) {
  const classes = useStyles()

  return (
    <React.Fragment>
      <div className={`${classes.title}`}>
        <List>
          {navItems.center.map((item, index) => (
            <DrawerItem key={index + item.name} item={item} />
          ))}
        </List>
      </div>
      <Divider />
      <div>
        <List>
          {navItems.right.map((item, index) => (
            <DrawerItem key={index + item.name} item={item} />
          ))}
        </List>
      </div>
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
})
