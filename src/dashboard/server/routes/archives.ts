import express from 'express'
import { archiveExists } from '../controllers/archives'
import { advancedResults } from '../middlewares/advancedResults'
import { ArchiveModel } from '../models/Archive'
import { genericReturn } from '../middlewares/genericReturn'
import { check } from 'express-validator'
import { bodyValidation } from '../middlewares/bodyValidation'

const router = express.Router()

//✔️
router.route('/').post(
  advancedResults(ArchiveModel),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

// ✔️
router.route('/exists').post(
  ...bodyValidation([check('archiveId').isString()]),
  archiveExists,
  genericReturn({
    keys: ['archive'],
    message: 'Archive is valid',
    success: true,
  })
)

export default router
