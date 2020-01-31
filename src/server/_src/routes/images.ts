import express from 'express'

import {
    tagImage,
    test
} from '../controllers/images'

// "/api/v1/images"
const router = express.Router();

router
    .route('/tag')
    .post(tagImage)

router
    .route('/test')
    .get(test)

export default router;