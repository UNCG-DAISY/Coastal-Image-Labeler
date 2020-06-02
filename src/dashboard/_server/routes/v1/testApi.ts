import express from 'express'

import {
    testGet,
    testPost,
    testLodash
} from '../../controllers/v1/testApi'

import {
    ensureAuthenticated
} from '../../middleware/v1/isAuthenticated'

import {
    authorize
} from '../../middleware/v1/auth'
// /api/v1/test
const router = express.Router();

 
router
    .route('/testLodash')
    .get(testLodash)



export default router;