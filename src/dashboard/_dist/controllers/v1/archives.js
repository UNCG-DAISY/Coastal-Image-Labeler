"use strict";
/*
    All functions related to archive api calls
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.findArchive = exports.getAllArchives = void 0;
//to avoid putting try catch everywhere
const async_1 = require("../../middleware/v1/async");
const Archive_1 = require("../../models/Archive");
/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/
 * @access      Public
 * @returns     all archives
 */
const getAllArchives = async_1.asyncHandler(async (req, res, next) => {
    //get all archives
    const archives = await Archive_1.ArchiveModel.find();
    res.status(200).json({
        success: true,
        message: `${res.advancedResults.length} archives found`,
        data: {
            archives: res.advancedResults
        }
    });
});
exports.getAllArchives = getAllArchives;
/**
 * @desc        Finds an archive
 * @route       POST /api/v1/archives/FindArchive/
 * @access      Public
 * @returns     all archives specified with req.body
 */
const findArchive = async_1.asyncHandler(async (req, res, next) => {
    const archives = await Archive_1.ArchiveModel.find(req.body);
    res.status(200).json({
        success: true,
        message: 'Archive that was found',
        data: {
            archives
        }
    });
});
exports.findArchive = findArchive;
