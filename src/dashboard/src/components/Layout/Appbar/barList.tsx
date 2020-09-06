import React from 'react'
import { makeStyles } from '@material-ui/core'
import { NavButtonLink } from './items/navLink'

interface Props {
  navItems: any
}

export function BarList(props: Props) {
  const { navItems } = props
  const classes = styles()
  return (
    <React.Fragment>
      <div className={`${classes.title} ${classes.showDesktop}`}>
        {navItems.center.map((item, index) => {
          return <NavButtonLink item={item} key={index + item.name} />
        })}
      </div>
      <div className={`${classes.showDesktop}`}>
        {navItems.right.map((item, index) => {
          return <NavButtonLink item={item} key={index + item.name} />
        })}
      </div>
    </React.Fragment>
  )
}

const styles = makeStyles((theme) => ({
  showDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  title: {
    flexGrow: 1,
  },
}))
