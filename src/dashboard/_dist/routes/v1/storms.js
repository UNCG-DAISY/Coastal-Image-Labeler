"use strict";
/*
    Storm related Api calls
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const storms_1 = require("../../controllers/v1/storms");
//Perform advanced results which means filtering, pagination, and query parameters
const advancedResults_1 = require("../../middleware/v1/advancedResults");
const Storm_1 = require("../../models/Storm");
// "/api/v1/storms/"
const router = express_1.default.Router();
//Get all storms
router
    .route('/')
    .get(advancedResults_1.advancedResults(Storm_1.StormModel, 'archives'), storms_1.getAllStorms);
//Get all storms that a user can tag
router
    .route('/user/:userId')
    .get(advancedResults_1.advancedResults(Storm_1.StormModel, 'archives'), storms_1.getStormsOfUser);
exports.default = router;
