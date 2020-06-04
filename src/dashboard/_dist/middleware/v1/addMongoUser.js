"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMongoUser = void 0;
/*
    TODO later once this file is done
*/
const errorResponse_1 = require("../../utils/v1/errorResponse");
const User_1 = require("../../models/User");
// import { Types } from 'mongoose'
//Grant access to specific roles
const addMongoUser = () => {
    return async (req, res, next) => {
        const mongoUser = await User_1.UserModel.findOne({ userId: req.user.id });
        //if no user found
        if (!mongoUser) {
            return next(new errorResponse_1.ErrorResponse(`User not found`, 404));
        }
        //console.log('add mongo user')
        res.mongoUser = mongoUser;
        next();
    };
};
exports.addMongoUser = addMongoUser;
