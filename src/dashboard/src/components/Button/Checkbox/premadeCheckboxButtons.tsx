import ColoredCheckbox from './index'
import * as colors from '@material-ui/core/colors/'

const YesNoCheckbox = (props) => (
  <ColoredCheckbox
    styles={{ box: colors.red[400], checked: colors.green[600] }}
    name={'group1'}
    value={'value1'}
    {...props}
  />
)

export { YesNoCheckbox }
