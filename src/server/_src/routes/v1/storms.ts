import express from 'express'

import {
    getAllStorms,
    getStorm
} from '../../controllers/v1/storms'

import {protect} from '../../middleware/v1/auth'

// "/api/v1/storms/"
const router = express.Router();

router
    .route('/')
    .post(getAllStorms)

router
    .route('/:userId')
    .post(getAllStorms)
    
router
    .route('/storm/:stormId')
    .post(getStorm)

router
    .route('/storm/:stormId/:userId')
    .post(getStorm)

export default router;