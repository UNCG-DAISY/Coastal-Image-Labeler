const yes = ['y', 'yes']
const no = ['n', 'no']
const yesNoList = [...yes, ...no]

const isRequired = (input) => (input === '' ? 'This value is required' : true)
const yesNoOnly = (input) =>
  yesNoList.includes(input.toLowerCase()) ? true : 'Enter valid yes/no answer'

const translateYesNoToBool = (input) => {
  if (yes.includes(input.toLowerCase())) {
    return true
  }
  if (no.includes(input.toLowerCase())) {
    return false
  }

  return undefined
}

export { isRequired, yesNoOnly, translateYesNoToBool }
