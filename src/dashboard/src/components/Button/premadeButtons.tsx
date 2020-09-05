import ColoredButton from './coloredButton'
import { theme, customColors } from '@/components/theme'

function CyanButton(props) {
  return (
    <ColoredButton
      color={customColors.cyan}
      borderColor={customColors.cyan}
      variant="outlined"
      {...props}
    >
      {props.children}
    </ColoredButton>
  )
}

function SkipButton(props) {
  return (
    <ColoredButton
      color={customColors.red}
      borderColor={customColors.red}
      hoverBackgroundColor={customColors.red}
      hoverBorderColor="white"
      hoverTextColor="white"
      variant="outlined"
      {...props}
    >
      {props.children}
    </ColoredButton>
  )
}

function SubmitButton(props) {
  return (
    <ColoredButton
      color={customColors.green}
      borderColor={customColors.green}
      hoverBackgroundColor={customColors.green}
      hoverBorderColor="black"
      hoverTextColor="black"
      variant="outlined"
      {...props}
    >
      {props.children}
    </ColoredButton>
  )
}

function ViewImage(props) {
  return (
    <ColoredButton
      color={theme.palette.primary.light}
      borderColor={theme.palette.primary.main}
      hovercolor={'white'}
      hoverBackgroundColor={theme.palette.primary.main}
      variant="outlined"
      {...props}
    >
      {props.children}
    </ColoredButton>
  )
}
export { CyanButton, SkipButton, SubmitButton, ViewImage }
