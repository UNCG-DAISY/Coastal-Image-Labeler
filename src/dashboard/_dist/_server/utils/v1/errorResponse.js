"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
/*
    this is a custom class we use for errors that extends the default error object.
    For example we add the statusCode to this object.
*/
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ErrorResponse = ErrorResponse;
