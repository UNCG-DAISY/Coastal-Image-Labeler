import React from 'react'
import { Controller } from 'react-hook-form'
import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  // Radio
} from '@material-ui/core'
import { YesNoRadio } from '../../Button/Radio/premadeRadioButtons'
import { generateLabel } from './Label'
import { errorText } from './ErrorText'

function generateRadio(radioQuestions, values) {
  const {
    label,
    key,
    required,
    buttons,
    errorMessage,
    docLink,
  } = radioQuestions
  const { globalDisable, control, errors } = values
  return (
    <React.Fragment key={key}>
      <FormControl fullWidth component="fieldset" margin="normal">
        <FormLabel component="legend">
          {generateLabel({ label, link: docLink })}
        </FormLabel>
        <Controller
          as={
            <RadioGroup aria-label={key} row>
              {buttons.map((radioButton) => (
                <FormControlLabel
                  value={radioButton.value}
                  control={<YesNoRadio />}
                  label={radioButton.name}
                  key={radioButton.value}
                  disabled={globalDisable}
                />
              ))}
            </RadioGroup>
          }
          name={key}
          control={control}
          rules={{ required: required }}
        />
        {errorText({ key, errorMessage, label, min: 1 }, { errors })}
      </FormControl>
    </React.Fragment>
  )
}

function generateRadioDefaults(input) {
  const defaults = {}

  input.map((question) => {
    if (question.type === 'radioGroup') {
      defaults[question.key] = ''
    }
  })
  return defaults
}

export { generateRadio, generateRadioDefaults }
