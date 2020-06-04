"use strict";
/*
    QuestionSet related Api calls
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionSet_1 = require("../../controllers/v1/questionSet");
const advancedResults_1 = require("../../middleware/v1/advancedResults");
const QuestionSet_1 = require("../../models/QuestionSet");
// "/api/v1/questionset/"
const router = express_1.default.Router();
//Get all existing archives
router
    .route('/')
    .get(advancedResults_1.advancedResults(QuestionSet_1.QuestionSetModel, ''), questionSet_1.getAllQuestionSets);
router
    .route('/getCatalogQuestionSet')
    .post(questionSet_1.getCatalogQuestionSet);
exports.default = router;
