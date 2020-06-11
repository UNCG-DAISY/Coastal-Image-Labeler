/*
    Storm related Api calls
*/

import express from 'express'

import {
    getAllCatalogs,
    getCatalogsOfUser,
    getUserResumeInfo,
    pickCatalogInfo
} from '../../controllers/v1/catalogs'

//Perform advanced results which means filtering, pagination, and query parameters
import {advancedResults} from '../../middleware/v1/advancedResults'

import {authorize} from '../../middleware/v1/auth'
import {CatalogModel} from '../../models/Catalog'

import {
    ensureAuthenticated
} from '../../middleware/v1/isAuthenticated'

import {addMongoUser} from '../../middleware/v1/addMongoUser'

// "/api/v1/catalogs/"
const router = express.Router();

//Get all catalogs
router
    .route('/')
    .get(ensureAuthenticated,advancedResults(CatalogModel,'archives'),getAllCatalogs)

//Get all catalogs that a user can tag
router
    .route('/user/:userId')
    .get(ensureAuthenticated,advancedResults(CatalogModel,'archives'),getCatalogsOfUser)

router
    .route('/getUserResumeInfo')
    .post(ensureAuthenticated,authorize('tagger'),addMongoUser(),getUserResumeInfo)

router
    .route('/pickCatalogInfo')
    .post(ensureAuthenticated,authorize('tagger'),addMongoUser(),pickCatalogInfo)

export default router;