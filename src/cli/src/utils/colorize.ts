import colors from 'colors'
colors

const colorize = {
  error(input) {
    console.log(input.red)
  },
  success(input) {
    console.log(input.green)
  },
  warning(input) {
    console.log(input.yellow)
  },
  info(input) {
    console.log(input.cyan)
  },
  log(input) {
    console.log(input.grey)
  },
}

export default colorize
