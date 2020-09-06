import React from 'react'
import { NavListLink } from './items/navList'
import MoreIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import Divider from '@material-ui/core/Divider'
import { IconButton, makeStyles } from '@material-ui/core'

interface Props {
  navItems: any
}

export function MenuSection(props: Props) {
  const { navItems } = props
  const classes = styles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <React.Fragment>
      <div className={classes.showMobile}>
        <IconButton onClick={handleClick} color="inherit">
          <MoreIcon />
        </IconButton>
      </div>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {navItems.center.map((item, index) => {
          return <NavListLink item={item} key={index + item.name} />
        })}
        {navItems.center.length > 0 && navItems.right.length > 0 && <Divider />}
        {navItems.right.map((item, index) => {
          return <NavListLink item={item} key={index + item.name} />
        })}
      </Menu>
    </React.Fragment>
  )
}

const styles = makeStyles((theme) => ({
  showMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))
