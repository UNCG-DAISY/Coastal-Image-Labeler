import { theme, customColors } from '@/components/theme'
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
    backgroundColor: customColors.darkerBackground,
  },
})

export { useRowStyles }
