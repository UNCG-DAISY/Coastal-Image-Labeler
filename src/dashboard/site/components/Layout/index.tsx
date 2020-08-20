import React, { ReactNode } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import Appbar from './Appbar'
import MobileDrawer from './Drawer/mobile'
import DesktopDrawer from './Drawer/desktop'
import { DrawerItemList } from './Drawer/drawerItemList'
import { uiConstants, navigationItems } from '../Constants'

const drawerWidth = uiConstants.drawerWidth

interface Props {
  title?: string
  user?: object
  drawer?: {
    content?: any
    list?: any
  }
  children: ReactNode
  navItems?: any
}

function Layout(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const { title, drawer, navItems } = props

  const classes = genUseStyle({ showDrawer: !!drawer })()

  const drawerContent = drawer
    ? drawer?.list
      ? DrawerItemList(drawer?.list)
      : drawer?.content
    : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Appbar
        title={title}
        drawer={{
          showDrawer: !!drawer,
          handleDrawerToggle: handleDrawerToggle,
          handleMenuToggle: handleMenuToggle,
        }}
        navItems={navItems ?? navigationItems.default}
        classes={classes}
      />

      <nav className={classes.drawer} aria-label="mailbox folders">
        {!!drawer && (
          <React.Fragment>
            {/* Phone mode */}
            <MobileDrawer
              handleDrawerToggle={handleDrawerToggle}
              mobileOpen={mobileOpen}
            >
              {drawerContent}
            </MobileDrawer>

            {/* Desktop mode */}
            <DesktopDrawer>{drawerContent}</DesktopDrawer>
          </React.Fragment>
        )}
      </nav>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container>{props.children}</Container>
      </main>
    </div>
  )
}

function genUseStyle({ showDrawer }) {
  return makeStyles((theme) => ({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: showDrawer ? drawerWidth : 0,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: showDrawer ? drawerWidth : 0,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
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
    spacedButton: {
      marginRight: `5px`,
    },
  }))
}

export default Layout
