/*
    QuestionSet related Api calls
*/

import express from 'express'
import {
    getAllQuestionSets,
    getCatalogQuestionSet
} from '../../controllers/v1/questionSet'
import {advancedResults} from '../../middleware/v1/advancedResults'
import {QuestionSetModel} from '../../models/QuestionSet'
import {
    ensureAuthenticated
} from '../../middleware/v1/isAuthenticated'

// "/api/v1/questionset/"
const router = express.Router();

//Get all existing archives
router
    .route('/')
    .get(ensureAuthenticated,advancedResults(QuestionSetModel,''),getAllQuestionSets)

router
    .route('/getCatalogQuestionSet')
    .post(ensureAuthenticated,getCatalogQuestionSet)
export default router;