import { asyncHandler } from './async'
import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

function bodyValidation(checks) {
  return [
    checks,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        //format the error messages
        const errorMessages = []
        errors.array().forEach((error) => {
          errorMessages.push(`${error.param}:${error.msg}`)
        })

        return res.status(422).json({
          success: false,
          message: errorMessages.join(' - '),
          data: errors,
        })
      }

      next()
    }),
  ]
}

export { bodyValidation }
