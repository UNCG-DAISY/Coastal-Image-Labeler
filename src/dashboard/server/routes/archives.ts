import express from 'express'
import { archiveExists } from '@/server/controllers/archives'
import { advancedResults } from '@/server/middlewares/advancedResults'
import { ArchiveModel } from '@/server/models/Archive'
import { genericReturn } from '@/server/middlewares/genericReturn'
import { check } from 'express-validator'
import { bodyValidation } from '@/server/middlewares/bodyValidation'

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
