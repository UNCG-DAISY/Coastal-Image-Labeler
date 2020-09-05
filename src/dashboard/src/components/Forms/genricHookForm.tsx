import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Typography, Divider, FormControl } from '@material-ui/core'

import { generateRadioDefaults } from './generate/Radio'
import { QuestionSetDocument } from '@/interfaces/models'
import determineQuestionType from './determineQuestionType'
import { SubmitButton, SkipButton } from '@/components/Button/premadeButtons'

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
              <SkipButton
                variant="outlined"
                onClick={() => {
                  setGlobalDisable(true)
                  skipImage()
                }}
                disabled={globalDisable}
              >
                Skip
              </SkipButton>
            </div>
            <div>
              <SubmitButton
                type="submit"
                // variant="outlined"
                // color="default"
                disabled={globalDisable}
              >
                Submit
              </SubmitButton>
            </div>
          </div>
        </FormControl>
      </form>
    </React.Fragment>
  )
}
