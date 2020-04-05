/*
    User related Api calls
*/

import express from 'express'

import {
    tagImage
} from '../../controllers/v1/image'

import {protect} from '../../middleware/v1/auth'

// "/api/v1/users/"
const router = express.Router();


router
    .route('/tagImage')
    .post(tagImage)

export default router;