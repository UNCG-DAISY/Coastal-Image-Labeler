import express from 'express'
import { testExpVal } from '../controllers/test'
import { check } from 'express-validator'
import { bodyValidation } from '../middlewares/bodyValidation'
import { advancedResults } from '../middlewares/advancedResults'
import { genericReturn } from '../middlewares/genericReturn'
import { TagModel } from '../models/Tag'

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

router.route('/testTagPop').get(
  advancedResults(TagModel, ['image', 'archive', 'catalog', 'user']),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

export default router
