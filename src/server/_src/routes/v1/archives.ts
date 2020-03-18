/*
    Archive related Api calls
*/

import express from 'express'

import {
    getAllArchives
} from '../../controllers/v1/archives'

//function that makes it so that you have to be logged in to call this api
import {protect} from '../../middleware/v1/auth'

// "/api/v1/archives/"
const router = express.Router();

//Get all existing archives
router
    .route('/')
    .get(getAllArchives)

export default router;