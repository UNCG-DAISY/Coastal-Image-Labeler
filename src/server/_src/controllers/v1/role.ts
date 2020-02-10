import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {RoleModel} from '../../models/Role'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import axios from 'axios'

/**
 * @desc        Gets all roles of a user
 * @route       GET /api/v1/user/isUser
 * @access      Public
 * @returns     yes
 */
const getRoles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const roles = await RoleModel.find()

    res.status(200).json({
        success:true,
        data:{
           roles:roles
        }
    })
   
})

export {
    getRoles
}