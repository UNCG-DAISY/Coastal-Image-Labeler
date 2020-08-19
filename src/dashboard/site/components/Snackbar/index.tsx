import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

interface Props {
  success: boolean
  message: string
  duration: number
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function SuccessErrorBar(props: Props) {
  const { message, success, duration } = props

  if (success) {
    return (
      <Snackbar open autoHideDuration={duration}>
        <Alert severity="success">{message}</Alert>
      </Snackbar>
    )
  } else {
    return (
      <Snackbar open autoHideDuration={duration}>
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    )
  }
}
