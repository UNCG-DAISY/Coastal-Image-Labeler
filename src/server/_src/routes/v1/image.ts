/*
    User related Api calls
*/

import express from 'express'

import {
    tagImage
} from '../../controllers/v1/image'

import {
    updatedTaggedImages
} from '../../controllers/v1/user'

import {protect} from '../../middleware/v1/auth'

// "/api/v1/images/"
const router = express.Router();


router
    .route('/tagImage')
    .post(tagImage,updatedTaggedImages) // ,TEST_assignNextImage

export default router;