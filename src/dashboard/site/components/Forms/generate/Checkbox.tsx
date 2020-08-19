import React from 'react'
import {
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core'
import { generateLabel } from './Label'

// import { YesNoCheckbox } from '../../Button/Checkbox/premadeCheckboxButtons'
import Checkbox from '@material-ui/core/Checkbox'
import { errorText } from './ErrorText'

function generateCheckbox(checkboxQuestions, values) {
  const {
    label,
    key,
    required,
    buttons,
    min,
    max,
    errorMessage,
    docLink,
  } = checkboxQuestions
  const { register, getValues, errors } = values
  return (
    <FormControl fullWidth component="fieldset" margin="normal" key={key}>
      <FormLabel component="legend" focused={false}>
        {generateLabel({ label, link: docLink })} {errorMessage}
      </FormLabel>
      <FormGroup row>
        {buttons.map((checkboxButton) => (
          <FormControlLabel
            key={checkboxButton.value}
            label={`${checkboxButton.name}`}
            control={
              <Checkbox
                disabled={false}
                color="primary"
                name={key}
                value={checkboxButton.value}
                inputProps={{
                  //@ts-ignore
                  ref: register({
                    required: required,
                    validate: () => {
                      let valid = true
                      if (min) {
                        valid = valid && getValues()[key].length >= min
                      }
                      if (max) {
                        valid = valid && getValues()[key].length <= max
                      }
                      return valid
                    },
                  }),
                }}
              />
            }
          />
        ))}
      </FormGroup>
      {errorText({ key, errorMessage, label, min, max }, { errors })}
    </FormControl>
  )
}

export { generateCheckbox }
