"use strict";
/*
    Archive related Api calls
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const archives_1 = require("../../controllers/v1/archives");
//function that makes it so that you have to be logged in to call this api
//import {protect} from '../../middleware/v1/auth'
// "/api/v1/archives/"
const router = express_1.default.Router();
//Get all existing archives
router
    .route('/')
    .get(archives_1.getAllArchives);
router
    .route('/FindArchive')
    .post(archives_1.findArchive);
exports.default = router;
