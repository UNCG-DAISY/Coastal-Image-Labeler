import express from 'express'

import {
    getAllStorms,
    getStorm,
    //createStorm
} from '../../controllers/v1/storms'

import {protect,authorize} from '../../middleware/v1/auth'

// "/api/v1/storms/"
const router = express.Router();

router
    .route('/')
    .get(getAllStorms)

router
    .route('/:userId')
    .get(getAllStorms)
    
// router
//     .route('/storm/')
//     .post(createStorm)//authorize('admin')


router
    .route('/storm/:stormId')
    .get(getStorm)

router
    .route('/storm/:stormId/:userId')
    .get(getStorm)

export default router;