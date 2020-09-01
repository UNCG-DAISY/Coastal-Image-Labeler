import { asyncHandler } from '../middlewares/async'
import { Request, Response } from 'express'

const testExpVal = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Done!',
  })
})

export { testExpVal }
