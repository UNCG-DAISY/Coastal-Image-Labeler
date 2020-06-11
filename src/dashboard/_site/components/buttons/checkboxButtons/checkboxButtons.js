import { withStyles } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors/';
import Checkbox from '@material-ui/core/Checkbox'

const ColorizeCheckbox = (color) => {
    return {
        root: {
            color: color.box,
            '&$checked': {
                color: color.checked,
            },
        },
        checked: {},
    }
}

const YesNoCheckbox = withStyles(ColorizeCheckbox({box:colors.red[400],checked:colors.green[600]}))(Checkbox);

export {
    YesNoCheckbox
}