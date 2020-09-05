import { makeStyles } from '@material-ui/core/styles'
import ColoredButton from '../../../Button/coloredButton'
import { NavItem } from '../../../../../interfaces'
interface Props {
  item: NavItem
}

export function NavButtonLink(props: Props) {
  const classes = styles()
  const { item } = props

  return (
    <ColoredButton
      className={classes.spacedButton}
      style={{}}
      {...item?.style}
      variant="outlined"
      href={item.route}
    >
      {item.name}
    </ColoredButton>
  )
}

const styles = makeStyles(() => ({
  spacedButton: {
    marginRight: `5px`,
  },
}))
