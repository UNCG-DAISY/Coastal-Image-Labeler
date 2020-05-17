import express from 'express'

import {
    testGet,
    testPost
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
    .route('/ensureAuthenticated')
    .get(ensureAuthenticated,testGet)

router
    .route('/authorize')
    .get(ensureAuthenticated,authorize('5e3e60207362e721e430ea6d'),testGet)

router
    .route('/authorize2')
    .get(ensureAuthenticated,authorize('5e3e60207362e721e430ea6e'),testGet)

export default router;