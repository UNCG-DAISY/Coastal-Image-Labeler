import express from 'express'

import {
    tagImage
} from '../controllers/images'

// "/api/v1/images"
const router = express.Router();

router
    .route('/tag')
    .post(tagImage)

export default router;