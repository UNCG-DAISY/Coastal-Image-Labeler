import { FormControl, FormLabel, FormGroup } from '@material-ui/core'

import { generateLabel } from './Label'
import { theme } from '../../theme'
// import { CyanButton } from '../../Button/premadeButtons'
import Button from '@material-ui/core/Button'

function generateQuickSubmitButton(buttonQuestions, values) {
  const { label, key, docLink, buttons } = buttonQuestions
  const { globalDisable, onSubmit } = values

  return (
    <FormControl fullWidth component="fieldset" margin="normal" key={key}>
      <FormLabel component="legend" focused={false}>
        {generateLabel({ label, link: docLink })}
      </FormLabel>
      <FormGroup row>
        {buttons.map((buttonData) => {
          const { label: buttonLabel, tag, key: buttonKey } = buttonData
          return (
            <Button
              key={buttonKey}
              variant="outlined"
              onClick={() => {
                onSubmit(tag)
              }}
              disabled={globalDisable}
              style={{ marginRight: theme.spacing(2) }}
            >
              {buttonLabel}
            </Button>
          )
        })}
      </FormGroup>
    </FormControl>
  )
}

export { generateQuickSubmitButton }
