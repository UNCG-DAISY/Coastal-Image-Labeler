import express from 'express'

import {
    testGet,
    testPost
} from '../../controllers/v1/testApi'

import {
    ensureAuthenticated,
    ensureAuthenticated2
} from '../../middleware/v1/authentucated'

const router = express.Router();

router
    .route('/get')
    .get(ensureAuthenticated2,testGet)
    
router
    .route('/post')
    .post(ensureAuthenticated,testPost)

export default router;