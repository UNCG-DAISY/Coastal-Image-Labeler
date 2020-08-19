import { asyncHandler } from './async'
import { Request } from 'express'
import { ExtenedResponse } from '../../interfaces'

interface Params {
  keys: string[]
  message: string
  success: boolean
}

const genericReturn = ({ keys, message, success }: Params) =>
  asyncHandler(async (req: Request, res: ExtenedResponse) => {
    const resObj = {}

    for (const key of keys) {
      if (res[key]) {
        resObj[key] = res[key]
      }
    }

    res.status(200).json({
      success: success,
      message: message,
      data: resObj,
    })
  })

export { genericReturn }
