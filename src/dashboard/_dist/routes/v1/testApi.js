"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const testApi_1 = require("../../controllers/v1/testApi");
// /api/v1/test
const router = express_1.default.Router();
router
    .route('/testLodash')
    .get(testApi_1.testLodash);
exports.default = router;
