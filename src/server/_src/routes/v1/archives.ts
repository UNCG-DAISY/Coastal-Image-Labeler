import express from 'express'

import {
    getAllArchives,
    getArchive
} from '../../controllers/v1/archives'

import {protect} from '../../middleware/v1/auth'

// "/api/v1/archives/"
const router = express.Router();

router
    .route('/')
    .post(getAllArchives)

router
    .route('/:userId')
    .post(getAllArchives)
    
router
    .route('/archive/:archiveId')
    .post(getArchive)

router
    .route('/archive/:archiveId/:userId')
    .post(getArchive)

export default router;