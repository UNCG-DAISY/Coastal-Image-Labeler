"use strict";
/*
    This file handles errors during API calls
*/
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = require("../../utils/v1/errorResponse");
exports.errorHandler = (err, req, res, next) => {
    var _a, _b, _c, _d;
    //Copy error object
    let error = { ...err };
    //set message
    error.message = err === null || err === void 0 ? void 0 : err.message;
    // Log to console
    console.log((_a = err === null || err === void 0 ? void 0 : err.stack) === null || _a === void 0 ? void 0 : _a.red);
    //Mongoose bad ObjectId (not formatted properly or not found)
    if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const message = `Resource not found with that ID of ${(_b = err === null || err === void 0 ? void 0 : err.value) !== null && _b !== void 0 ? _b : ''}`;
        error = new errorResponse_1.ErrorResponse(message, 404);
    }
    //Mongoose duplicate key
    if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const message = `Duplicate field value entered`;
        error = new errorResponse_1.ErrorResponse(message, 400);
    }
    //Mongoose validation error
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const message = Object.values(err === null || err === void 0 ? void 0 : err.errors).map(val => val.message).join(',');
        error = new errorResponse_1.ErrorResponse(message, 400);
    }
    res.status((_c = error.statusCode) !== null && _c !== void 0 ? _c : 500).json({
        success: false,
        message: error.message,
        error: (_d = error.message) !== null && _d !== void 0 ? _d : 'Server Error'
    });
};
