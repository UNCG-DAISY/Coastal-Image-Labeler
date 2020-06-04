"use strict";
/*
    Storm related Api calls
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catalogs_1 = require("../../controllers/v1/catalogs");
//Perform advanced results which means filtering, pagination, and query parameters
const advancedResults_1 = require("../../middleware/v1/advancedResults");
const auth_1 = require("../../middleware/v1/auth");
const Catalog_1 = require("../../models/Catalog");
const isAuthenticated_1 = require("../../middleware/v1/isAuthenticated");
const addMongoUser_1 = require("../../middleware/v1/addMongoUser");
// "/api/v1/catalogs/"
const router = express_1.default.Router();
//Get all catalogs
router
    .route('/')
    .get(advancedResults_1.advancedResults(Catalog_1.CatalogModel, 'archives'), catalogs_1.getAllCatalogs);
//Get all catalogs that a user can tag
router
    .route('/user/:userId')
    .get(advancedResults_1.advancedResults(Catalog_1.CatalogModel, 'archives'), catalogs_1.getCatalogsOfUser);
router
    .route('/getUserResumeInfo')
    .post(isAuthenticated_1.ensureAuthenticated, auth_1.authorize('tagger'), addMongoUser_1.addMongoUser(), catalogs_1.getUserResumeInfo);
router
    .route('/pickCatalogInfo')
    .post(isAuthenticated_1.ensureAuthenticated, auth_1.authorize('tagger'), addMongoUser_1.addMongoUser(), catalogs_1.pickCatalogInfo);
exports.default = router;
