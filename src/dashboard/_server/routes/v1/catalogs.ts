/*
    Storm related Api calls
*/

import express from 'express'

import {
    getAllCatalogs,
    getCatalogsOfUser
} from '../../controllers/v1/storms'

//Perform advanced results which means filtering, pagination, and query parameters
import {advancedResults} from '../../middleware/v1/advancedResults'

import {authorize} from '../../middleware/v1/auth'
import {CatalogModel} from '../../models/Catalog'

// "/api/v1/catalogs/"
const router = express.Router();

//Get all catalogs
router
    .route('/')
    .get(advancedResults(CatalogModel,'archives'),getAllCatalogs)

//Get all catalogs that a user can tag
router
    .route('/user/:userId')
    .get(advancedResults(CatalogModel,'archives'),getCatalogsOfUser)

export default router;