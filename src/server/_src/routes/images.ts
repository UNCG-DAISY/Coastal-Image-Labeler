import express from 'express'

import {
    tagImage,
    test
} from '../controllers/images'

import {protect} from '../middleware/auth'

// "/api/v1/images"
const router = express.Router();

router
    .route('/tag')
    .post(tagImage)

router
    .route('/test')
    .get(protect,test)

export default router;