import express from 'express'

import {
    tagImage,
    test,
    getRoleTest
} from '../../controllers/v1/test'

import {protect} from '../../middleware/v1/auth'

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