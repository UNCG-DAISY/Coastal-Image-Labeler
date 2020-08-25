import express from 'express'
import { testExpVal } from '../controllers/test'
import { check } from 'express-validator'
import { bodyValidation } from '../middlewares/bodyValidation'

const router = express.Router()

//✔️
router
  .route('/testBodyValidation')
  .post(
    ...bodyValidation([
      check('archiveId').isString(),
      check('userId').isString(),
      check('count').isNumeric(),
      check('a.b').isNumeric(),
    ]),
    testExpVal
  )

export default router
