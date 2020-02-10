import express from 'express'

import {
    getAllStorms,
    getStorm,
    createStorm
} from '../../controllers/v1/storms'

import {protect,authorize} from '../../middleware/v1/auth'

// "/api/v1/storms/"
const router = express.Router();

//Get all storms
router
    .route('/')
    .get(getAllStorms)

router
    .route('/:userId')
    .get(getAllStorms)

//Creating a storm
router
    .route("/storm")
    .post(createStorm)

export default router;