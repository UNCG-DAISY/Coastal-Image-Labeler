"use strict";
/*
  This handles the try catch so we dont have to repeat our self in the controller

  The way it works is you pass in a function called `fn`, then it returns a function that executes
  the function `fn` in a promise and does catch inside it.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
exports.asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
