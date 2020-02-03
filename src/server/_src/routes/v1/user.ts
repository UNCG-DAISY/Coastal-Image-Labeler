import express from 'express'

import {
    isInMongoDB,
    getUserRoles
} from '../../controllers/v1/user'

import {protect} from '../../middleware/v1/auth'

// "/api/v1/user/isUser"
const router = express.Router();

router
    .route('/isUser')
    .post(isInMongoDB)

router
    .route('/getRoles')
    .post(getUserRoles)

export default router;