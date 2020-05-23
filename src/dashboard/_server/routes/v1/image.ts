/*
    User related Api calls
*/

import express from 'express'

import {
    tagImage,
    showImage
} from '../../controllers/v1/image'

import {
    updatedTaggedImages
} from '../../controllers/v1/user'

import {
    ensureAuthenticated
} from '../../middleware/v1/isAuthenticated'
import {
    authorize
} from '../../middleware/v1/auth'
// "/api/v1/images/"
const router = express.Router();


router
    .route('/tagImage')
    .post(ensureAuthenticated,authorize('5e3e60207362e721e430ea6d'),tagImage,updatedTaggedImages)
router
    .route('/skipImage/:archive')
    .get(ensureAuthenticated,authorize('5e3e60207362e721e430ea6d'),updatedTaggedImages)

router
    .route('/show/:id')
    .get(showImage)
export default router;