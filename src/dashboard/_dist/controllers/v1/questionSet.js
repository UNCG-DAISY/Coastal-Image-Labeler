"use strict";
/*
    All functions related to archive api calls
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCatalogQuestionSet = exports.getAllQuestionSets = void 0;
//to avoid putting try catch everywhere
const async_1 = require("../../middleware/v1/async");
const QuestionSet_1 = require("../../models/QuestionSet");
const Catalog_1 = require("../../models/Catalog");
/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/
 * @access      Public
 * @returns     all archives
 */
const getAllQuestionSets = async_1.asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: `${res.advancedResults.length} question sets found`,
        data: {
            questionSets: res.advancedResults
        }
    });
});
exports.getAllQuestionSets = getAllQuestionSets;
/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/
 * @access      Public
 * @returns     all archives
 */
const getCatalogQuestionSet = async_1.asyncHandler(async (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "No body sent",
        });
    }
    if (!req.body.catalogName) {
        return res.status(400).json({
            success: false,
            message: "No catalog name sent",
        });
    }
    const { catalogName } = req.body;
    const catalogDoc = await Catalog_1.CatalogModel.findOne({ name: catalogName });
    if (!catalogDoc) {
        return res.status(400).json({
            success: false,
            message: `No catalog with name ${catalogName} found`,
        });
    }
    const questionSetDoc = await QuestionSet_1.QuestionSetModel.findById(catalogDoc.questionSet);
    if (!questionSetDoc) {
        return res.status(400).json({
            success: false,
            message: `No question set with UD ${catalogDoc.questionSet} found`,
        });
    }
    res.status(200).json({
        success: true,
        message: `${req.body.catalogName} question set found`,
        data: {
            questionSets: questionSetDoc
        }
    });
});
exports.getCatalogQuestionSet = getCatalogQuestionSet;
