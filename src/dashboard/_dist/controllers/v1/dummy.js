"use strict";
/*
    All functions related to roles api calls
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyRes = void 0;
const async_1 = require("../../middleware/v1/async"); //to avoid putting try catch everywhere
const dummyRes = async_1.asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'I am dummy res',
    });
});
exports.dummyRes = dummyRes;
