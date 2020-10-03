// import { ArchiveModel } from '../models/Archive'
import { asyncHandler } from '@/middlewares/async' //to avoid putting try catch everywhere
import { ExtenedResponse } from '@/interfaces/index'
import { Request } from 'express'
import { log } from '@/utils/logger'
import { getQSetKeys } from '@/utils/getQuestionSetKeys'

//✔️
const getQuestionSetKeys = asyncHandler(
  async (req: Request, res: ExtenedResponse) => {
    const { id } = req.params

    log({
      message: `Request to get headers for question with id = ${id}`,
      type: 'info',
    })

    const result = await getQSetKeys(id)

    res.status(200).json({
      success: true,
      message: `Header keys for question set id = ${id}`,
      data: result,
    })
  }
)

export { getQuestionSetKeys }
