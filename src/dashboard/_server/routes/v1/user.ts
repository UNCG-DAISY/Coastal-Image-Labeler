/*
    User related Api calls
*/

import express from 'express'

import {
    //getUserRoles,
    findUser,
    //checkUserRoles,
    createNewUser,
    allowedPages,
    getAssignedImage,
} from '../../controllers/v1/user'

import {
    ensureAuthenticated
} from '../../middleware/v1/isAuthenticated'

import {
    authorize,
    userPartOfCatalog
} from '../../middleware/v1/auth'

// "/api/v1/users/"
const router = express.Router();

//Get a user by post data sent
router
    .route('/findUser')
    .post(ensureAuthenticated,findUser)

//This is at _app.js
router
    .route('/createUser')
    .post(ensureAuthenticated,createNewUser)

router
    .route('/allowedPages/:id')
    .get(ensureAuthenticated,allowedPages)

router
    .route('/getImage/:archive')
    .post(ensureAuthenticated,authorize('tagger'),userPartOfCatalog(),getAssignedImage)

// router
//     .route('/assignedImage')
//     .get(getAssignedImage)
export default router;