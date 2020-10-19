import React from 'react'
import {
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core'
import { generateLabel } from './Label'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { errorText } from './ErrorText'
import { YesNoCheckbox } from '@/components/Button/Checkbox/premadeCheckboxButtons'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

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
  const spacing = checkboxQuestions?.spacing ?? {}

  const classes = useStyles()

  const { register, getValues, errors } = values

  return (
    <FormControl fullWidth component="fieldset" margin="normal" key={key}>
      <FormLabel component="legend" focused={false}>
        {generateLabel({ label, link: docLink })} {errorMessage}
      </FormLabel>
      <FormGroup row className={classes.root}>
        {/* <div className={classes.root}> */}
        <Grid container spacing={2}>
          {buttons.map((checkboxButton, index) => (
            <Grid item {...spacing} key={`${key}-checkbox-${index}`}>
              <FormControlLabel
                key={checkboxButton.value}
                label={`${checkboxButton.name}`}
                control={
                  <YesNoCheckbox
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
            </Grid>
          ))}
        </Grid>
        {/* </div> */}
      </FormGroup>
      {errorText({ key, errorMessage, label, min, max }, { errors })}
    </FormControl>
  )
}

export { generateCheckbox }
