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
  const typeMessage = {
    info: '[INFO]',
    ok: '[OK]',
    error: '[ERROR]',
    time: '[TIME]',
  }

  //add color when in dev mode
  if (process.env.NODE_ENV === 'development') {
    switch (type) {
      case 'info':
        output = message.cyan
        typeMessage.info = typeMessage.info.cyan
        break
      case 'ok':
        output = message.green
        typeMessage.ok = typeMessage.ok.green
        break
      case 'error':
        output = message.red
        typeMessage.error = typeMessage.error.red
        break
      case 'time':
        output = message.yellow
        typeMessage.time = typeMessage.time.yellow
        break
      default:
        break
    }
  }

  switch (type) {
    case 'info':
      console.log(time, typeMessage.info, '>', output)
      break
    case 'ok':
      console.log(time, typeMessage.ok, '>', output)
      break
    case 'error':
      console.log(time, typeMessage.error, '>', output)
      break
    case 'time':
      console.log(time, typeMessage.time, '>', output)
      break
    default:
      console.log(time, '>', output)
      break
  }
}

export { log }
