import express from 'express'

import {
  allCatalogDetails,
  catalogExists,
  getCatalogQuestionSet,
} from '@/server/controllers/catalogs'

//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '@/server/middlewares/advancedResults'

import { ensureAuthenticated } from '@/server/middlewares/ensureAuth'
import { CatalogModel } from '@/server/models/Catalog'
import { insertUser } from '@/server/middlewares/insertUser'
import { membershipCatalogMiddleware } from '@/server/middlewares/membership/catalog'

import { filterUserCatalogsMiddleware } from '@/server/middlewares/filter/catalog/filterUserCatalogs'
import { genericReturn } from '@/server/middlewares/genericReturn'
import { check } from 'express-validator'
import { bodyValidation } from '@/server/middlewares/bodyValidation'
import { hasRoles } from '@/middlewares/hasRoles'
const router = express.Router()

//✔️
router
  .route('/')
  .post(
    advancedResults(CatalogModel, ['archives']),
    genericReturn({
      keys: ['advancedResults'],
      message: 'Advanced Results',
      success: true,
    })
  )
  .get(
    advancedResults(CatalogModel, ['archives']),
    genericReturn({
      keys: ['advancedResults'],
      message: 'Advanced Results',
      success: true,
    })
  )

//✔️
router.route('/userCatalogs').post(
  ensureAuthenticated,
  insertUser,
  advancedResults(CatalogModel, ['archives']),
  filterUserCatalogsMiddleware,
  genericReturn({
    keys: ['advancedResults'],
    message: 'Advanced Results',
    success: true,
  })
)

//✔️
router.route('/catalogMembership').post(
  ensureAuthenticated,
  insertUser,
  ...bodyValidation([check('catalogId').isString()]),
  catalogExists,
  membershipCatalogMiddleware,
  genericReturn({
    keys: ['membershipCatalog'],
    message: 'User has membership to catalog',
    success: true,
  })
)

//✔️
router.route('/exists').post(
  ...bodyValidation([check('archiveId').isString()]),
  catalogExists,
  genericReturn({
    keys: ['catalog'],
    success: true,
    message: 'Catalog is valid',
  })
)

router
  .route('/detail')
  .post(ensureAuthenticated, insertUser, hasRoles(['admin']), allCatalogDetails)
//✔️
router.route('/questionSet').post(
  ...bodyValidation([check('catalogId').isString()]),
  catalogExists,
  getCatalogQuestionSet,
  genericReturn({
    keys: ['questionSet'],
    success: true,
    message: 'Found QuestionSet',
  })
)

export default router
