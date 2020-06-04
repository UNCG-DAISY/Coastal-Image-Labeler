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
    authorize,
    imagePartOfCatalog
} from '../../middleware/v1/auth'
import {
    dummyRes
} from '../../controllers/v1/dummy'
// "/api/v1/images/"
const router = express.Router();


router
    .route('/tagImage')
    .post(ensureAuthenticated,authorize('tagger'),tagImage,updatedTaggedImages)
router
    .route('/skipImage/:archive')
    .get(ensureAuthenticated,authorize('tagger'),updatedTaggedImages)

router
    .route('/show/:id')
    .get(showImage)
export default router;