"use strict";
/*
    All functions related to storm api calls
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStormsOfUser = exports.getStorm = exports.getAllStorms = void 0;
const async_1 = require("../../middleware/v1/async"); //to avoid putting try catch everywhere
const User_1 = require("../../models/User");
//import { promises } from "dns"
/**
 * @desc        Gets all storms
 * @route       GET /api/v1/storms/:userId
 * @access      Public
 * @returns     yes
 */
const getAllStorms = async_1.asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});
exports.getAllStorms = getAllStorms;
/**
 * @desc        Gets all storms of a user
 * @route       GET /api/v1/storms/:userId
 * @access      Public
 * @returns     yes
 */
const getStormsOfUser = async_1.asyncHandler(async (req, res, next) => {
    var _a, _b, _c;
    //Get all storms that gets completed in advResults
    const storms = res.advancedResults.data;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
    //Find the user by id
    const user = (await User_1.UserModel.find({
        "_id": userId
    }))[0];
    //Do we want to get all taggable storms/archives of this user, or just all
    const taggableFilter = (_c = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.taggable) !== null && _c !== void 0 ? _c : false;
    const stormsOfUser = user.storms;
    let data = [];
    //For each storm that exists
    await Promise.all(storms.map((storm, index) => {
        //If that storm is part of the users storms,add it to the data to be returned
        if (stormsOfUser.includes(storm._id)) {
            let stormOfUser = storm;
            //Get all archives
            let archivesOfStorm = stormOfUser.archives;
            let archivesToReturn = archivesOfStorm;
            //If we just want taggalbe archives, filter
            if (taggableFilter) {
                archivesToReturn = archivesOfStorm.filter(function (archive) {
                    return archive === null || archive === void 0 ? void 0 : archive.taggable;
                });
            }
            //Push this data on to the user and the data to return
            stormOfUser.archives = archivesToReturn;
            data.push(stormOfUser);
        }
    }));
    res.advancedResults.data = data;
    res.status(200).json(res.advancedResults);
});
exports.getStormsOfUser = getStormsOfUser;
/**
 * @desc        Gets a storm by Id
 * @route       GET /api/v1/storms/storm/:stormId/:userId
 * @access      Public
 * @returns     yes
 */
const getStorm = async_1.asyncHandler(async (req, res, next) => {
    console.log(res.advancedResults);
    res.status(200).json(res.advancedResults);
});
exports.getStorm = getStorm;
