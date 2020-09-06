import { TextField } from '@material-ui/core'

function generateTextField(textFieldInfo, values) {
  const { required, key, multiline, rows } = textFieldInfo
  const { register, errors, globalDisable } = values
  return (
    <TextField
      fullWidth
      type="text"
      name={textFieldInfo.label}
      id="filled-required"
      label={textFieldInfo.label}
      variant="filled"
      inputRef={register({ required: required })}
      error={!!errors[key]}
      key={key}
      multiline={multiline ?? false}
      rows={rows ?? 1}
      disabled={globalDisable}
    />
  )
}

export { generateTextField }
