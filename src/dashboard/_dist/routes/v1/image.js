"use strict";
/*
    User related Api calls
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const image_1 = require("../../controllers/v1/image");
const user_1 = require("../../controllers/v1/user");
const isAuthenticated_1 = require("../../middleware/v1/isAuthenticated");
const auth_1 = require("../../middleware/v1/auth");
// "/api/v1/images/"
const router = express_1.default.Router();
router
    .route('/tagImage')
    .post(isAuthenticated_1.ensureAuthenticated, auth_1.authorize('5e3e60207362e721e430ea6d'), image_1.tagImage, user_1.updatedTaggedImages);
router
    .route('/skipImage/:archive')
    .get(isAuthenticated_1.ensureAuthenticated, auth_1.authorize('5e3e60207362e721e430ea6d'), user_1.updatedTaggedImages);
exports.default = router;
