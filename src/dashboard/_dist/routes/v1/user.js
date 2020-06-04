"use strict";
/*
    User related Api calls
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../../controllers/v1/user");
const isAuthenticated_1 = require("../../middleware/v1/isAuthenticated");
const auth_1 = require("../../middleware/v1/auth");
// "/api/v1/users/"
const router = express_1.default.Router();
//Get a user by post data sent
router
    .route('/findUser')
    .post(user_1.findUser);
//This is at _app.js
router
    .route('/createUser')
    .post(user_1.createNewUser);
router
    .route('/allowedPages/:id')
    .get(isAuthenticated_1.ensureAuthenticated, user_1.allowedPages);
router
    .route('/getImage/:archive')
    .post(isAuthenticated_1.ensureAuthenticated, auth_1.authorize('tagger'), auth_1.userPartOfCatalog(), user_1.getAssignedImage);
// router
//     .route('/assignedImage')
//     .get(getAssignedImage)
exports.default = router;
