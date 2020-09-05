import ColoredRadioButtons from './index'
import * as colors from '@material-ui/core/colors/'

function YesNoRadio(props) {
  return (
    <ColoredRadioButtons
      styles={{
        checked: colors.green[600],
        circle: colors.red[400],
      }}
      {...props}
    />
  )
}

export { YesNoRadio }
