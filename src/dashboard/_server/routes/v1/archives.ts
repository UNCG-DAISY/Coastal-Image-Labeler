/*
    Archive related Api calls
*/

import express from 'express'
import {
    getAllArchives,
    findArchive
} from '../../controllers/v1/archives'
import {advancedResults} from '../../middleware/v1/advancedResults'
import {ArchiveModel} from '../../models/Archive'

// "/api/v1/archives/"
const router = express.Router();

//Get all existing archives
router
    .route('/')
    .get(advancedResults(ArchiveModel,''),getAllArchives)

router
    .route('/FindArchive')
    .post(advancedResults(ArchiveModel,''),findArchive)

export default router;