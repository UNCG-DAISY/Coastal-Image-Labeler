import express from 'express'
import { testExpVal } from '@/server/controllers/test'
import { check } from 'express-validator'
import { bodyValidation } from '@/server/middlewares/bodyValidation'
import { advancedResults } from '@/server/middlewares/advancedResults'
import { genericReturn } from '@/server/middlewares/genericReturn'
import { TagModel } from '@/server/models/Tag'

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
