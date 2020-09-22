//Used to log, similiar to the one in the dashboard.


import colors from 'colors'
colors
import moment from 'moment'

interface LogType {
  message?: string | any
  type?: '' | 'info' | 'ok' | 'error' | 'time'
}

function log({ message = '', type = '' }: LogType) {
  if (!message) {
    message = ''
  }
  if (process.env.NEXT_PUBLIC_LOGGING === 'false') {
    return
  }

  const time = moment().format()
  if (process.env.NODE_ENV === 'development') {
    switch (type) {
      case 'info':
        console.log(time, '>', message.cyan)
        break
      case 'ok':
        console.log(time, '>', message.green)
        break
      case 'error':
        console.log(time, '>', message.red)
        break
      case 'time':
        console.log(time, '>', message.yellow)
        break
      default:
        console.log(time, '>', message)
        break
    }
  } else {
    console.log(time, '>', message)
  }
}

export { log }
