import express from 'express'
import { genericReturn } from '@/server/middlewares/genericReturn'
//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '@/server/middlewares/advancedResults'
import { TagModel } from '@/server/models/Tag'

import { ensureAuthenticated } from '@/server/middlewares/ensureAuth'
import { insertUser } from '@/server/middlewares/insertUser'
import {
  tagImage,
  exportUserTags,
  exportAllTags,
} from '@/server/controllers/tags'
import { unassignImage } from '@/server/controllers/assignedImages'
import { check } from 'express-validator'
import { bodyValidation } from '@/server/middlewares/bodyValidation'
import { hasRoles } from '@/server/middlewares/hasRoles'
const router = express.Router()

//✔️
router.route('/').post(
  advancedResults(TagModel),
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

//✔️
router.route('/tagImage').post(
  ensureAuthenticated,
  insertUser,
  ...bodyValidation([
    check('userId').isString(),
    check('imageId').isString(),
    check('tags').exists(),
  ]),
  hasRoles(['tagger']),
  tagImage,
  unassignImage,
  genericReturn({
    keys: [],
    message: 'Tagged Image',
    success: true,
  })
)

router.route('/skipImage').post(ensureAuthenticated, insertUser, tagImage)

router
  .route('/export')
  .get(ensureAuthenticated, insertUser, hasRoles(['tagger']), exportUserTags)
router
  .route('/export/all')
  .get(ensureAuthenticated, insertUser, hasRoles(['admin']), exportAllTags)
export default router
