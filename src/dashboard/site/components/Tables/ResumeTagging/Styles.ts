import { theme } from '../../theme'
import { makeStyles } from '@material-ui/core/styles'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  headerText: {
    color: theme.palette.secondary.main,
  },
  header: {
    backgroundColor: '#002132', //theme.palette.common.black,
  },
})

export { useRowStyles }
