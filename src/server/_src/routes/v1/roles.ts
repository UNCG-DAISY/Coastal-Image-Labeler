import express from 'express'

import {
    getRoles
} from '../../controllers/v1/role'

import {protect} from '../../middleware/v1/auth'

// "/api/v1/user/isUser"
const router = express.Router();

router
    .route('/')
    .get(getRoles)


export default router;