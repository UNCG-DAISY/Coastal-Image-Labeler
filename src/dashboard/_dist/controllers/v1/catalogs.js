"use strict";
/*
    All functions related to storm api calls
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickCatalogInfo = exports.getUserResumeInfo = exports.getCatalogsOfUser = exports.getAllCatalogs = void 0;
const async_1 = require("../../middleware/v1/async"); //to avoid putting try catch everywhere
const User_1 = require("../../models/User");
const Image_1 = require("../../models/Image");
const Archive_1 = require("../../models/Archive");
const Catalog_1 = require("../../models/Catalog");
/**
 * @desc        Gets all storms
 * @route       GET /api/v1/catalogs/
 * @access      Public
 * @returns     yes
 */
const getAllCatalogs = async_1.asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});
exports.getAllCatalogs = getAllCatalogs;
/**
 * @desc        Gets all storms of a user
 * @route       GET /api/v1/catalogs/:userId
 * @access      Public
 * @returns     yes
 */
const getCatalogsOfUser = async_1.asyncHandler(async (req, res, next) => {
    var _a, _b, _c;
    //Get all storms that gets completed in advResults
    const storms = res.advancedResults.data;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.userId;
    /* Have mongo user ID be sent instead */
    //Find the user by id
    const user = (await User_1.UserModel.find({
        "_id": userId
    }))[0];
    //Do we want to get all taggable storms/archives of this user, or just all
    const taggableFilter = (_c = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.taggable) !== null && _c !== void 0 ? _c : false;
    const stormsOfUser = user.catalogs;
    let data = [];
    //We have a list of storm ids, we need to get
    //the actual data from those storms
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
exports.getCatalogsOfUser = getCatalogsOfUser;
/**
 * @desc        Gets the resume tagging information for a user
 * @route       POST /api/v1/catalogs/getUserResumeInfo
 * @access      Public
 * @returns     yes
 */
const getUserResumeInfo = async_1.asyncHandler(async (req, res, next) => {
    // console.log('RESUME --- ',res.mongoUser)
    const { imagesTagged, assignedImages } = res.mongoUser;
    let resumeObj = {};
    let taggedImagesCategorized = {};
    //Go through the tagged images and group them by catalogs, then by archive
    await Promise.all(imagesTagged.map(async (imageId, index) => {
        const getImage = await Image_1.ImageModel.findById(imageId);
        if (!getImage) {
            return;
        }
        const getArchive = await Archive_1.ArchiveModel.findById(getImage.archive);
        if (!getArchive) {
            return;
        }
        const getCatalog = await Catalog_1.CatalogModel.findById(getArchive.catalog);
        if (!getCatalog) {
            return;
        }
        const catalogName = getCatalog.name;
        const archiveName = getArchive.name;
        //if no entry for this catalog has been made
        if (!taggedImagesCategorized[catalogName]) {
            taggedImagesCategorized[catalogName] = {};
        }
        //if no entry for this archive has been made
        if (!taggedImagesCategorized[catalogName][archiveName]) {
            taggedImagesCategorized[catalogName][archiveName] = 0;
        }
        taggedImagesCategorized[catalogName][archiveName] = taggedImagesCategorized[catalogName][archiveName] + 1;
    }));
    //for each assigned image, pull how many you have tagged from that images archive
    //and how many are in that archive
    await Promise.all(Object.keys(assignedImages).map(async (image, index) => {
        var _a, _b;
        const getImage = await Image_1.ImageModel.findById(assignedImages[image]);
        if (!getImage) {
            return;
        }
        const getArchive = await Archive_1.ArchiveModel.findById(getImage.archive);
        if (!getArchive) {
            return;
        }
        const getCatalog = await Catalog_1.CatalogModel.findById(getArchive.catalog);
        if (!getCatalog) {
            return;
        }
        const catalogName = getCatalog.name;
        const archiveName = getArchive.name;
        const getTotalImagesArchive = await Image_1.ImageModel.find({ archive: getArchive._id });
        const totalTaggedOfArchive = await Image_1.ImageModel.find({ tags: { $exists: true, $not: { $size: 0 } } });
        // console.log('taggedImagesCategorized',taggedImagesCategorized)
        // console.log('catalogName',taggedImagesCategorized[catalogName]?.[archiveName])
        resumeObj[image] = {
            taggedByUser: (_b = (_a = taggedImagesCategorized === null || taggedImagesCategorized === void 0 ? void 0 : taggedImagesCategorized[catalogName]) === null || _a === void 0 ? void 0 : _a[archiveName]) !== null && _b !== void 0 ? _b : 0,
            totalForArchive: getTotalImagesArchive.length,
            totalTaggedForArchive: totalTaggedOfArchive.length,
            URL: `/auth/tagImage?catalog=${catalogName}&archive=${archiveName}`,
            archiveName: archiveName,
            catalogName: catalogName
        };
    }));
    return res.status(200).json({
        success: true,
        message: 'Done',
        data: {
            resumeObj,
        }
    });
});
exports.getUserResumeInfo = getUserResumeInfo;
/**
 * @desc        Gets the dropdown info for picking a catalog/archive to tag
 * @route       POST /api/v1/catalogs/pickCatalogInfo
 * @access      Public
 * @returns     yes
 */
const pickCatalogInfo = async_1.asyncHandler(async (req, res, next) => {
    const { catalogs } = res.mongoUser;
    let dropdownInfo = {};
    //For each catalog the user is part of, create sub objects where the key is the archives name.
    //then for each archive object keep track of how many images are part of that archive.
    await Promise.all(await catalogs.map(async (catalogId, index) => {
        //Get fully populated Catalog
        const populatedCatalog = await Catalog_1.CatalogModel.findById(catalogId).populate('archives');
        if (!populatedCatalog) {
            return;
        }
        const catalogName = populatedCatalog.name;
        dropdownInfo[catalogName] = {};
        //Get the catalog info(year,desc,link) and place them in
        dropdownInfo[catalogName].info = populatedCatalog.catalogInfo;
        //Create empty objects where the keys are the names of the archives
        dropdownInfo[catalogName].archives = {};
        populatedCatalog.archives.forEach(element => {
            dropdownInfo[catalogName].archives[element.name] = {};
        });
        //How many images are part of this catalog
        let totalImagesOfCatalog = 0;
        //For each archive of this catalog
        await Promise.all(await populatedCatalog.archives.map(async (archiveDoc, index) => {
            //Get how many images are part of this archive
            const imagesOfArchive = await Image_1.ImageModel.find({ archive: archiveDoc._id });
            const numImages = imagesOfArchive.length;
            const archiveName = archiveDoc.name;
            //Add to the archive object the number of images of that archive
            dropdownInfo[catalogName].archives[archiveName].totalImages = numImages;
            //Add this same number to the total images of catalog
            totalImagesOfCatalog += numImages;
        }));
        dropdownInfo[catalogName].totalImages = totalImagesOfCatalog;
    }));
    return res.status(200).json({
        success: true,
        message: 'Done',
        data: {
            dropdownInfo
        }
    });
});
exports.pickCatalogInfo = pickCatalogInfo;
