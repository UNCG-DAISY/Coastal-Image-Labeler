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
// "/api/v1/users/"
const router = express_1.default.Router();
//Get a user by post data sent
router
    .route('/findUser')
    .post(user_1.findUser);
//Gets all roles of a user
router
    .route('/getRoles')
    .post(user_1.getUserRoles);
//Checks if a given user id is able to access certain features
router
    .route('/auth/:id')
    .post(user_1.checkUserRoles);
//Creates a user with just id and displayName and creation date
//This is at _app.js
router
    .route('/createUser')
    .post(user_1.createNewUser);
router
    .route('/allowedPages/:id')
    .get(user_1.allowedPages);
router
    .route('/getImage/:archive')
    .get(user_1.getAssignedImage);
// router
//     .route('/TEST_nextImage/:archive')
//     .get(updatedTaggedImages)
exports.default = router;
