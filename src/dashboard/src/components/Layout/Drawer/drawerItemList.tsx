import { List, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import { DrawerItem } from './drawerItem'
const pkg = require('../../../../package.json')

const DevText = () => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production') {
    return undefined
  }

  return `dev`
}

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
      {navItems.center.length > 0 && navItems.right.length > 0 && <Divider />}
      <div>
        <List>
          {navItems.right.map((item, index) => (
            <DrawerItem key={index + item.name} item={item} />
          ))}
        </List>
      </div>
      <Divider />

      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Typography component="div" variant="overline">
          <Box color="text.disabled">
            Version: {pkg.version} {DevText()}
          </Box>
        </Typography>
      </div>
    </React.Fragment>
  )
}

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
})
