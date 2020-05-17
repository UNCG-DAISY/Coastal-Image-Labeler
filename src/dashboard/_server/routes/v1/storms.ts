/*
    Storm related Api calls
*/

import express from 'express'

import {
    getAllStorms,
    getStorm,
    getStormsOfUser
    //createStorm
} from '../../controllers/v1/storms'

//Perform advanced results which means filtering, pagination, and query parameters
import {advancedResults} from '../../middleware/v1/advancedResults'

import {authorize} from '../../middleware/v1/auth'
import {StormModel} from '../../models/Storm'

// "/api/v1/storms/"
const router = express.Router();

//Get all storms
router
    .route('/')
    .get(advancedResults(StormModel,'archives'),getAllStorms)

//Get all storms that a user can tag
router
    .route('/user/:userId')
    .get(advancedResults(StormModel,'archives'),getStormsOfUser)

export default router;