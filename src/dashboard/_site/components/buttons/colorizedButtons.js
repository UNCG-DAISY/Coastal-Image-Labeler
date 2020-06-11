import { makeStyles,withStyles  } from '@material-ui/core/styles';
import theme from '../theme';
import * as colors from '@material-ui/core/colors/';
import Button from '@material-ui/core/Button';

const ColorizeButton = (color,theme) => {
    return {
        root: {
            color: color.text ?? theme.palette.getContrastText(color.color),
            backgroundColor: color.background,
            borderColor:color.borderColor,
            '&:hover': {
                backgroundColor: color.hover,
                color: color.hoverText
            },
            '&:disabled': {
                backgroundColor: 'grey',
                color:'#000000'
            },
        },
    }
}

const SkipButton = withStyles((theme) => (
    ColorizeButton({
        text:theme.palette.customColors.red,
        borderColor:theme.palette.customColors.red
        //background:theme.palette.customColors.red,
        //hover:colors.red[800]
    },theme)
))(Button);

const WaterButton = withStyles((theme) => (
    ColorizeButton({
        text:theme.palette.customColors.cyan,
        borderColor:theme.palette.customColors.cyan
        //background:theme.palette.customColors.cyan,
        //hover:colors.cyan[800]
    },theme)
))(Button);

const SubmitButton = withStyles((theme) => (
    ColorizeButton({
        text:theme.palette.customColors.green,
        borderColor:theme.palette.customColors.green,
        //background:theme.palette.primary.main,
        hover:theme.palette.customColors.green,
        hoverText:'#000000'
    },theme)
))(Button);

export {
    SkipButton,
    WaterButton,
    SubmitButton
}