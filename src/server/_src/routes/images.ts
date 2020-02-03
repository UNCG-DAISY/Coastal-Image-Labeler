import express from 'express'

import {
    tagImage,
    test,
    getRoleTest
} from '../controllers/test'

import {protect} from '../middleware/auth'

// "/api/v1/images"
const router = express.Router();

router
    .route('/tag')
    .post(tagImage)

router
    .route('/test')
    .get(protect,test)

    router
    .route('/test/:id')
    .post(getRoleTest)

export default router;