import { withStyles } from '@material-ui/core/styles'
// import theme from '../theme';
// import * as colors from '@material-ui/core/colors/';
import Button from '@material-ui/core/Button'

interface Props {
  textColor?: string
  backgroundColor?: string
  borderColor?: string

  hoverTextColor?: string
  hoverBackgroundColor?: string
  hoverBorderColor?: string

  disabledTextColor?: string
  disabledBackgroundColor?: string
  disabledBorderColor?: string

  children?: React.ReactNode

  style: Record<string, any>
  //otherProps: any
}

export default function ColoredButton(props: Props) {
  const {
    textColor,
    backgroundColor,
    borderColor,

    hoverTextColor,
    hoverBackgroundColor,
    hoverBorderColor,

    disabledTextColor,
    disabledBackgroundColor,
    disabledBorderColor,

    children,

    style,
    ...otherProps
  } = props

  const StyledButton = withStyles(() => ({
    root: {
      color: textColor,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
      '&:hover': {
        color: hoverTextColor,
        backgroundColor: hoverBackgroundColor,
        borderColor: hoverBorderColor,
      },
      '&:disabled': {
        color: disabledTextColor ?? '#000000',
        backgroundColor: disabledBackgroundColor ?? 'grey',
        borderColor: disabledBorderColor ?? 'white',
      },
      ...style,
    },
  }))(Button)

  return <StyledButton {...otherProps}>{children}</StyledButton>
}
