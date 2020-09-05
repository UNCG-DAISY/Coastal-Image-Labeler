import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { defaultTitle } from '../../Constants'
import { MenuSection } from './menuList'
import { BarList } from './barList'

interface Props {
  title?: string
  user?: object
  navItems: any
  drawer?: {
    showDrawer: boolean
    handleDrawerToggle?: () => void
    handleMenuToggle?: () => void
  }
}

function Appbar(props: Props) {
  const classes = styles()
  const { navItems, drawer } = props
  const { handleDrawerToggle, showDrawer } = drawer

  return (
    <AppBar position="fixed" className={classes.appBar} color="primary">
      <Toolbar>
        {showDrawer && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.showMobile}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap className={classes.title}>
          {props?.title || defaultTitle}
        </Typography>

        <BarList navItems={navItems} />

        {(navItems.center.length > 0 || navItems.right.length > 0) && (
          <MenuSection navItems={navItems} />
        )}
      </Toolbar>
    </AppBar>
  )
}

const styles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  showDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  showMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
}))

export default Appbar
