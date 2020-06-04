"use strict";
/*
    TODO later once this file is done
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPartOfCatalog = exports.imagePartOfCatalog = exports.authorize = void 0;
const errorResponse_1 = require("../../utils/v1/errorResponse");
const User_1 = require("../../models/User");
const Archive_1 = require("../../models/Archive");
const Catalog_1 = require("../../models/Catalog");
const Image_1 = require("../../models/Image");
// import { Types } from 'mongoose'
//Grant access to specific roles
const authorize = (roles) => {
    return async (req, res, next) => {
        var _a;
        const mongoUser = await User_1.UserModel.findOne({ userId: req.user.id });
        //if no user found
        if (!mongoUser) {
            return next(new errorResponse_1.ErrorResponse(`User not found`, 404));
        }
        //if admin, continue
        if (mongoUser.roles.includes('admin')) {
            return next();
        }
        //if no tag req meet
        if (!mongoUser.roles.includes(roles)) {
            return next(new errorResponse_1.ErrorResponse(`User/User role ${(_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.displayName} is not authorized to access this route`, 403));
        }
        next();
    };
};
exports.authorize = authorize;
//makes sure a given image is part of a catalog that a user can tag
const imagePartOfCatalog = () => {
    return async (req, res, next) => {
        //if no body
        if (!req.body) {
            return next(new errorResponse_1.ErrorResponse(`No body sent`, 400));
        }
        //Get the mongoDB information on the user
        const mongoUser = await User_1.UserModel.findOne({ userId: req.user.id });
        const { catalogs } = mongoUser;
        //Then get the catalog of the image that is being tagged
        //get image
        const imageId = req.body._id;
        const imageDoc = await Image_1.ImageModel.findById(imageId);
        if (!imageDoc) {
            return next(new errorResponse_1.ErrorResponse(`Invalid image Id`, 400));
        }
        //get archive
        const archiveDoc = await Archive_1.ArchiveModel.findById(imageDoc.archive);
        if (!archiveDoc) {
            return next(new errorResponse_1.ErrorResponse(`Invalid archive Id`, 400));
        }
        //get catalog
        const catalogDoc = await Catalog_1.CatalogModel.findById(archiveDoc.catalog);
        if (!catalogDoc) {
            return next(new errorResponse_1.ErrorResponse(`Invalid catalog Id`, 400));
        }
        //check
        if (!catalogs.includes(catalogDoc._id)) {
            res.status(400).json({
                success: false,
                message: `User ${req.user.displayName} not allowed to tag Catalog ${catalogDoc.name}`,
            });
            //return next(new ErrorResponse(`User ${req.user.id} not allowed to tag Catalog ${catalogDoc._id}`,400))
        }
        next();
    };
};
exports.imagePartOfCatalog = imagePartOfCatalog;
//makes sure a given user is part of a catalog
const userPartOfCatalog = () => {
    return async (req, res, next) => {
        //if no query param
        if (!req.params) {
            return next(new errorResponse_1.ErrorResponse(`No query param sent`, 400));
        }
        //Get the mongoDB information on the user
        const mongoUser = await User_1.UserModel.findOne({ userId: req.user.id });
        const { catalogs } = mongoUser;
        const archive = req.params.archive;
        const archiveDoc = await Archive_1.ArchiveModel.findOne({ name: archive });
        const catalogDoc = await Catalog_1.CatalogModel.findById(archiveDoc.catalog);
        //check
        if (!catalogs.includes(catalogDoc._id)) {
            return res.status(400).json({
                success: false,
                message: `User ${req.user.displayName} not allowed to tag Catalog ${catalogDoc.name}`,
            });
            //return next(new ErrorResponse(`User ${req.user.id} not allowed to tag Catalog ${catalogDoc._id}`,400))
        }
        next();
    };
};
exports.userPartOfCatalog = userPartOfCatalog;
