"use strict";
/*
    All functions related to roles api calls
*/
Object.defineProperty(exports, "__esModule", { value: true });
const async_1 = require("../../middleware/v1/async"); //to avoid putting try catch everywhere
const Role_1 = require("../../models/Role");
//import {ErrorResponse} from '../../utils/v1/errorResponse'
//import axios from 'axios'
/**
 * @desc        Gets all roles of a user
 * @route       GET /api/v1/user/isUser
 * @access      Public
 * @returns     yes
 */
const getRoles = async_1.asyncHandler(async (req, res, next) => {
    const roles = await Role_1.RoleModel.find();
    res.status(200).json({
        success: true,
        data: {
            roles: roles
        }
    });
});
exports.getRoles = getRoles;
