import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Typography, Divider, FormControl } from '@material-ui/core'
import { generateRadioDefaults } from './generate/Radio'
import { QuestionSetDocument } from '@/interfaces/models'
import determineQuestionType from './determineQuestionType'
import { SubmitButton, SkipButton } from '@/components/Button/premadeButtons'
import Box from '@material-ui/core/Box'

interface Props {
  questionSetData: QuestionSetDocument
  formFunctions: {
    skipImage: () => void
    submitTags: (tags: any) => void
  }
  setTag: React.Dispatch<React.SetStateAction<{}>>
  imageId: string
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
    imageId
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
          <Typography component="div" variant="overline">
            <Box color="text.disabled">
              Image ID: {imageId}
            </Box>
          </Typography>
        </FormControl>
      </form>
    </React.Fragment>
  )
}
