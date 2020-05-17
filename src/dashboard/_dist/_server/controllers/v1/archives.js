"use strict";
/*
    All functions related to archive api calls
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.findArchive = exports.getArchive = exports.getAllArchives = void 0;
const async_1 = require("../../middleware/v1/async"); //to avoid putting try catch everywhere
//import {UserModel} from '../../models/User'
const Archive_1 = require("../../models/Archive");
//import {ErrorResponse} from '../../utils/v1/errorResponse'
//import axios from 'axios'
/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/
 * @access      Public
 * @returns     yes
 */
const getAllArchives = async_1.asyncHandler(async (req, res, next) => {
    const archives = await Archive_1.ArchiveModel.find();
    res.status(200).json({
        success: true,
        data: {
            archives
        }
    });
});
exports.getAllArchives = getAllArchives;
/**
 * @desc        Gets a archive by ID
 * @route       GET /api/v1/archives/archive/:archiveId
 * @access      Public
 * @returns     yes
 */
const getArchive = async_1.asyncHandler(async (req, res, next) => {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.archiveId) {
        //get a storm
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    res.status(201).json({
        success: false,
        data: {}
    });
});
exports.getArchive = getArchive;
/**
 * @desc        Finds an archive
 * @route       POST /api/v1/archives/FindArchive/
 * @access      Public
 * @returns     yes
 */
const findArchive = async_1.asyncHandler(async (req, res, next) => {
    const archives = await Archive_1.ArchiveModel.find(req.body);
    res.status(200).json({
        success: true,
        data: {
            archives
        }
    });
});
exports.findArchive = findArchive;
