import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import { NavItem } from '../../../../../interfaces'
interface Props {
  item: NavItem
}

export class NavListLink extends React.Component<Props> {
  render() {
    const { item } = this.props
    return (
      <a
        href={item.route}
        style={{
          textDecoration: 'none',
          ...item.style,
          color: item?.style?.color ?? 'inherit',
        }}
      >
        <ListItem button>
          <ListItemText primary={item.name} />
        </ListItem>
      </a>
    )
  }
}
