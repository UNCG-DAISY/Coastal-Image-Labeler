/*
    User related Api calls
*/

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

//Get a user by ID
router
    .route('/:id')
    .get(getUser)

//Checks if someone is a user
router
    .route('/isUser')
    .post(isInMongoDB)

//Gets all roles of a user
router
    .route('/getRoles')
    .post(getUserRoles)

//Checks if a given user id is able to access certain features
router
    .route('/auth/:id')
    .post(checkUserRoles)

export default router;