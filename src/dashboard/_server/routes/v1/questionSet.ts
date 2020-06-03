/*
    QuestionSet related Api calls
*/

import express from 'express'
import {
    getAllQuestionSets
} from '../../controllers/v1/questionSet'
import {advancedResults} from '../../middleware/v1/advancedResults'
import {QuestionSetModel} from '../../models/QuestionSet'

// "/api/v1/questionset/"
const router = express.Router();

//Get all existing archives
router
    .route('/')
    .get(advancedResults(QuestionSetModel,''),getAllQuestionSets)

export default router;