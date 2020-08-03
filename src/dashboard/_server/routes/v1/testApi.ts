import express from 'express'

import {
    testGet,
    testPost,
    testLodash,
    testQuery,
    testCreate
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

router
    .route('/testQuery')
    .get(testQuery)

router
    .route('/testCreate')
    .get(testCreate)



export default router;