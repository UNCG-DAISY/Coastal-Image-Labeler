import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import * as colors from '@material-ui/core/colors/';

const ColorizeButton = (color) => {
    return {
        root: {
            color: color.circle,
            '&$checked': {
                color: color.checked,
            },
        },
        checked: {},
    }
}

const RedRadio = withStyles(ColorizeButton({circle:colors.red[400],checked:colors.red[600]}))(Radio);
const GreenRadio = withStyles(ColorizeButton({circle:colors.green[400],checked:colors.green[600]}))(Radio);
const YesNoRadio = withStyles(ColorizeButton({circle:colors.red[400],checked:colors.green[600]}))(Radio);
export {
    RedRadio,
    GreenRadio,
    YesNoRadio
}