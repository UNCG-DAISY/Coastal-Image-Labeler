import { makeStyles } from '@material-ui/core'
import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import React from 'react'
import { NavItem } from '../../../../interfaces'

interface Props {
  item: NavItem
}

export function DrawerItem(props: Props) {
  const classes = useStyles()
  const { item } = props
  return (
    <a href={item.route} className={classes.noDecor}>
      <ListItem button style={{ ...item.style }}>
        <React.Fragment>
          {item.icon && (
            <ListItemIcon style={{ ...item.style }}>
              <item.icon />
            </ListItemIcon>
          )}
          <ListItemText className={classes.spacedButton} color="inherit">
            {item.name}
          </ListItemText>
        </React.Fragment>
      </ListItem>
    </a>
  )
}

const useStyles = makeStyles({
  spacedButton: {
    marginRight: `5px`,
  },
  noDecor: {
    textDecoration: 'none',
    color: 'inherit',
  },
})
