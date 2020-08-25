import express from 'express'

import { catalogExists, getCatalogQuestionSet } from '../controllers/catalogs'

//Perform advanced results which means filtering, pagination, and query parameters
import { advancedResults } from '../middlewares/advancedResults'

import { ensureAuthenticated } from '../middlewares/ensureAuth'
import { CatalogModel } from '../models/Catalog'
import { insertUser } from '../middlewares/insertUser'
import { membershipCatalogMiddleware } from '../middlewares/membership/catalog'

import { filterUserCatalogsMiddleware } from '../middlewares/filter/catalog/filterUserCatalogs'
import { genericReturn } from '../middlewares/genericReturn'
import { check } from 'express-validator'
import { bodyValidation } from '../middlewares/bodyValidation'

const router = express.Router()

//✔️
router.route('/').post(
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
