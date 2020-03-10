import express from 'express'

import {
    getAllStorms,
    getStorm,
    getStormsOfUser
    //createStorm
} from '../../controllers/v1/storms'
import {advancedResults} from '../../middleware/v1/advancedResults'
import {protect,authorize} from '../../middleware/v1/auth'
import {StormModel} from '../../models/Storm'
// "/api/v1/storms/"
const router = express.Router();

//Get all storms
router
    .route('/')
    .get(advancedResults(StormModel,'archives'),getAllStorms)

router
    .route('/user/:userId')
    .get(advancedResults(StormModel,'archives'),getStormsOfUser)

// //Creating a storm
// router
//     .route("/storm")
//     .post(createStorm)

export default router;