import { generateRadio } from './generate/Radio'
import { generateCheckbox } from './generate/Checkbox'
import { generateTextField } from './generate/Textfield'
import { generateQuickSubmitButton } from './generate/QuickSubmit'

export default function determineQuestionType(questionList, values) {
  const {
    globalDisable = false,
    control,
    errors,
    register,
    getValues,
    onSubmit,
  } = values

  return questionList.map((question) => {
    switch (question.type) {
      case 'radioGroup':
        return generateRadio(question, { globalDisable, control, errors })

      case 'checkboxGroup':
        return generateCheckbox(question, {
          globalDisable: false,
          register,
          getValues,
          errors,
        })

      case 'textField':
        return generateTextField(question, {
          globalDisable,
          register,
          errors,
        })

      case 'buttonSubmit':
        return generateQuickSubmitButton(question, {
          globalDisable: globalDisable,
          onSubmit: onSubmit,
        })

      default:
        break
    }
  })
}
