import express from 'express'

import {
    isInMongoDB,
    getUserRoles,
    getUser,
    checkUserRoles
} from '../../controllers/v1/user'

import {protect} from '../../middleware/v1/auth'

// "/api/v1/user/isUser"
const router = express.Router();

router
    .route('/:id')
    .get(getUser)

router
    .route('/isUser')
    .post(isInMongoDB)

router
    .route('/getRoles')
    .post(getUserRoles)

router
    .route('/auth/:id')
    .post(checkUserRoles)

export default router;