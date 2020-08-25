import React from 'react'
import { Alert, AlertTitle } from '@material-ui/lab'

interface Props {
  title: string
  message: string
  variant?: 'outlined' | 'filled' | 'standard'
  severity?: 'error' | 'info' | 'success' | 'warning'
}

export default class ErrorAlert extends React.Component<Props> {
  render() {
    const { title, message, variant, severity } = this.props
    return (
      <Alert severity={severity ?? 'error'} variant={variant || 'outlined'}>
        <AlertTitle>{title ?? 'Error'}</AlertTitle>
        {message ?? 'Error'}
      </Alert>
    )
  }
}
