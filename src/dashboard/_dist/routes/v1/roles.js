"use strict";
/*
    Roles related Api calls
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_1 = require("../../controllers/v1/role");
//import {} from '../../middleware/v1/auth'
// "/api/v1/user/isUser"
const router = express_1.default.Router();
//Get all roles
router
    .route('/')
    .get(role_1.getRoles);
exports.default = router;
