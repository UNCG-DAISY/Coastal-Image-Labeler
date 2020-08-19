import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Typography, Divider, FormControl } from '@material-ui/core'

import { generateRadioDefaults } from './generate/Radio'
// import { generateCheckbox } from './generate/Checkbox'
// import { generateTextField } from './generate/Textfield'
// import { generateQuickSubmitButton } from './generate/QuickSubmit'

// import { ResponseType } from '../../../interfaces'
import { QuestionSetDocument } from '../../../interfaces/models'
import determineQuestionType from './determineQuestionType'
// import { SubmitButton, SkipButton } from '../Button/premadeButtons'
import Button from '@material-ui/core/Button'

interface Props {
  questionSetData: QuestionSetDocument
  formFunctions: {
    skipImage: () => void
    submitTags: (tags: any) => void
  }
  setTag: React.Dispatch<React.SetStateAction<{}>>
}

export default function GenericHookForm(props: Props) {
  const [globalDisable, setGlobalDisable] = useState(false)

  const {
    questionSetData = {
      questions: [],
      name: '',
      description: '',
    },
    formFunctions = {
      tagAsWater: () => {},
      skipImage: () => {},
      submitTags: () => {},
    },
  } = props

  const { skipImage, submitTags } = formFunctions

  const { questions } = questionSetData

  const {
    register,
    handleSubmit,
    errors,
    //watch,
    getValues,
    control,
    //setValue
  } = useForm({
    defaultValues: {
      ...generateRadioDefaults(questions),
    },
  })

  const onSubmit = (data) => {
    setGlobalDisable(true)
    submitTags(data)
  }

  return (
    <React.Fragment>
      <Typography color="secondary">
        {questionSetData.name}:{questionSetData.description}
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <React.Fragment>
            {determineQuestionType(questions, {
              globalDisable,
              control,
              errors,
              register,
              getValues,
              onSubmit,
            })}
          </React.Fragment>
        </div>
        <Divider />
        <FormControl fullWidth component="fieldset" margin="normal">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}
          >
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  setGlobalDisable(true)
                  skipImage()
                }}
                disabled={globalDisable}
              >
                Skip
              </Button>
            </div>
            <div>
              <Button
                type="submit"
                variant="outlined"
                color="default"
                disabled={globalDisable}
              >
                Submit
              </Button>
            </div>
          </div>
        </FormControl>
      </form>
    </React.Fragment>
  )
}
