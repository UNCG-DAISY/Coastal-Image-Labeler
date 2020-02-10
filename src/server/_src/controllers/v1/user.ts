import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
import {RoleModel} from '../../models/Role'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import axios from 'axios'

/**
 * @desc        Checks to see if a user is in the MongoDB
 * @route       GET /api/v1/user/isUser
 * @access      Public
 * @returns     yes
 */
const isInMongoDB = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const data = req?.body
    if(!data.id) {
        return next(new ErrorResponse(`Please send a userId`,400))
    }

    if(!data.username) {
        return next(new ErrorResponse(`Please send a username`,400))
    }

    const user = await UserModel.find({
        userId:data.id
    }).populate('roleData')

    if(user.length === 0) {

        let user_entry = await UserModel.create({
            userId:data.id,
            userName:data.username,
            //dateAdded: Date.now()
        })

        user_entry = await UserModel.findOne({
            userId:data.id
        }).populate('roleData')

        res.status(201).json({
            success:true,
            data:{
                message:'User made',
                user:user_entry
            }
        })

    }
    else {
        res.status(200).json({
            success:true,
            data:{
                message:'User exists',
                user:user
            }
        })        
    }
})

/**
 * @desc        Gets all roles of a user
 * @route       GET /api/v1/user/isUser
 * @access      Public
 * @returns     yes
 */
const getUserRoles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const userId = req?.body?.id

    //If no user id sent
    if(!userId) {
        return next(new ErrorResponse(`Please send a userId`,400))
    }
  
    const options:any = {
        method: 'GET',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
        headers:{
            authorization: `Bearer ${global.MANGAGEMENT_TOKEN}`
        }
    };
    
    //Call auth0 api for user roles
    const role_data:[any] = (await axios.get(options.url,options)).data
    
    let roles = []

    //Since array of roles,just get the important stuff
    role_data.forEach(role => {
        roles.push({
            role:role.name,
            role_description:role.description
        })
    });

    res.status(200).json({
        success:true,
        data:{
           roles:roles
        }
    })
   
})

/**
 * @desc        Gets a user
 * @route       GET /api/v1/user/:id
 * @access      Public
 * @returns     yes
 */
const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const user  = await UserModel.findById(req?.params?.id).populate('roleData')

    res.status(200).json({
        success:true,
        data:{
            user
        }
    }) 
})

/**
 * @desc        Given a user id, and 
 * @route       GET /api/v1/user/:id
 * @access      Public
 * @returns     yes
 */
const checkUserRoles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const user  = await UserModel.findById(req?.params?.id).populate('roleData')
    const userRoles = user.roleNames

    const allowedRoles = req?.body?.allowedRoles ?? []

    const user_roles_set:Set<string> = new Set(userRoles)
    const roles_set:Set<string> = new Set(allowedRoles)

    const role_intersection:Set<string> = new Set(
        [...user_roles_set].filter(x => roles_set.has(x)));

    
    if(role_intersection.size === 0) {
        res.status(200).json({
            success:true,
            data:{
                message: 'Denied',
                allowed:false
            }
        }) 
    }
    else {
        res.status(200).json({
            success:true,
            data:{
                message: 'Allowed',
                allowed:true
            }
        }) 
    }
    
    
})

export {
    isInMongoDB,
    getUserRoles,
    getUser,
    checkUserRoles
}