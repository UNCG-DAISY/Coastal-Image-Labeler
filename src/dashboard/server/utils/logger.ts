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

  //dont show any logs if this env is false
  if (process.env.NEXT_PUBLIC_LOGGING === 'false') {
    return
  }

  const time = moment().format()

  let output = message

  //add color when in dev mode
  if (process.env.NODE_ENV === 'development') {
    switch (type) {
      case 'info':
        output = message.cyan
        break
      case 'ok':
        output = message.green
        break
      case 'error':
        output = message.red
        break
      case 'time':
        output = message.yellow
        break
      default:
        break
    }
  }

  switch (type) {
    case 'info':
      console.log(time, '[INFO]', '>', output)
      break
    case 'ok':
      console.log(time, '[OK]', '>', output)
      break
    case 'error':
      console.log(time, '[ERROR]', '>', output)
      break
    case 'time':
      console.log(time, '[TIME]', '>', output)
      break
    default:
      console.log(time, '>', output)
      break
  }
}

export { log }
