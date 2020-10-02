import { QuestionSetModel } from '@/models/QuestionSet'
import { log } from './logger'

export async function getQSetKeys(id: string) {
  try {
    const qSet = await QuestionSetModel.findById(id)
    log({
      message: `Looking for question set with id = ${id}`,
      type: 'info',
    })

    if (!qSet) {
      log({
        message: `Did not find question set with id = ${id}`,
        type: 'error',
      })
      return []
    }

    log({
      message: `Found question set with id = ${id}, length = ${qSet.questions.length}`,
      type: 'ok',
    })

    const keys = []

    qSet.questions.forEach((question) => {
      if (question.type.toString() == 'buttonSubmit') {
        question.buttons.forEach((button) => {
          keys.push(...Object.keys(button.tag))
        })
      } else {
        keys.push(question.key)
      }
    })

    log({
      message: `Returning qSet keys of length = ${keys.length}`,
      type: 'info',
    })

    return keys
  } catch (error) {
    console.error(error)
    return []
  }
}
