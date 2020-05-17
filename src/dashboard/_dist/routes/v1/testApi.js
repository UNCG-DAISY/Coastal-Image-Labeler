"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testApi_1 = require("../../controllers/v1/testApi");
const isAuthenticated_1 = require("../../middleware/v1/isAuthenticated");
const auth_1 = require("../../middleware/v1/auth");
// /api/v1/test
const router = express_1.default.Router();
router
    .route('/ensureAuthenticated')
    .get(isAuthenticated_1.ensureAuthenticated, testApi_1.testGet);
router
    .route('/authorize')
    .get(isAuthenticated_1.ensureAuthenticated, auth_1.authorize('5e3e60207362e721e430ea6d'), testApi_1.testGet);
router
    .route('/authorize2')
    .get(isAuthenticated_1.ensureAuthenticated, auth_1.authorize('5e3e60207362e721e430ea6e'), testApi_1.testGet);
exports.default = router;
