import express from 'express'
import {
  getCurrentlyAssignedImage,
  insertTaggedCount,
  assignImage,
} from '@/server/controllers/assignedImages'
import { advancedResults } from '@/server/middlewares/advancedResults'
import { AssignedImageModel } from '@/server/models/AssignedImages'
import { ensureAuthenticated } from '@/server/middlewares/ensureAuth'
import { insertUser } from '@/server/middlewares/insertUser'
import { genericReturn } from '@/server/middlewares/genericReturn'
import { membershipCatalogMiddleware } from '@/server/middlewares/membership/catalog'
import { check } from 'express-validator'
import { bodyValidation } from '@/server/middlewares/bodyValidation'
import { archiveExists } from '@/server/controllers/archives'

const router = express.Router()

//✔️
router.route('/').post(
  advancedResults(AssignedImageModel, ['archive', 'catalog']),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

//✔️
router.route('/getImage').post(
  ensureAuthenticated,
  insertUser,
  ...bodyValidation([check('archiveId').isString()]),
  archiveExists,
  membershipCatalogMiddleware,
  getCurrentlyAssignedImage,
  assignImage,
  genericReturn({
    keys: ['assignedImage'],
    message: 'Assigned Image',
    success: true,
  })
)

//✔️
router.route('/getAllCurrent').post(
  ensureAuthenticated,
  insertUser,
  insertTaggedCount,
  genericReturn({
    keys: ['taggedCount'],
    message: 'Got tagged table data',
    success: true,
  })
)

export default router
