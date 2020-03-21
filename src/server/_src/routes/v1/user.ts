/*
    User related Api calls
*/

import express from 'express'

import {
    getUserRoles,
    findUser,
    checkUserRoles,
    createNewUser
} from '../../controllers/v1/user'

import {protect} from '../../middleware/v1/auth'

// "/api/v1/users/"
const router = express.Router();

//Get a user by post data sent
router
    .route('/findUser')
    .post(findUser)

//Gets all roles of a user
router
    .route('/getRoles')
    .post(getUserRoles)

//Checks if a given user id is able to access certain features
router
    .route('/auth/:id')
    .post(checkUserRoles)

//Creates a user with just id and displayName and creation date
router
    .route('/createUser')
    .post(createNewUser)

export default router;