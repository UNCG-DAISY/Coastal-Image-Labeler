/*
    TODO later once this file is done
*/


import {asyncHandler} from './async'  
import {ErrorResponse} from '../../utils/v1/errorResponse'
import { Request,Response,NextFunction } from "express"
import {rbacJson,UserDocument} from '../../index'
import {UserModel} from '../../models/User'

//protect routes

const protect = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
    let token;
    
    if(!req?.user) {
        //res.redirect('/');
        return next(new ErrorResponse('Not authorized to access this route',401))
    }
    
    //User is good to access
    next()
})

//Grant access to specific roles
const authorize = (...roles:string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const userId = req?.user?.id ?? ''
        const mongoUser = req?.user?.mongoUser ?? {}
        const userRoles = mongoUser?.roles ?? []

        const user_roles_set:Set<string> = new Set(userRoles)
        const roles_set:Set<string> = new Set(roles)

        const role_intersection:Set<string> = new Set(
            [...user_roles_set].filter(x => roles_set.has(x)));

        
        if(role_intersection.size === 0) {
            return next(new ErrorResponse(`User is not authorized to access this route`,403))
        }
        console.log(roles)
        next()
    }
}

const RBAC = async (user:UserDocument,roles:rbacJson) => {
    let userRoles = user.roleNames

    // if(userRoles) {
    //     userRoles =  await UserModel.findOne(user._id).populate('roleData')
    // }

    let {all:mustHaveRoles,one:atleastOneRoles} = roles

    let userRolesSet = new Set(userRoles)

    //if there are roles that must have
    if(mustHaveRoles.length > 0) {
        let mustHaveRolesSet = new Set(mustHaveRoles)
    

        let allRolesIntersection = new Set(
            [...mustHaveRolesSet].filter(x => userRolesSet.has(x)));
        
        //If doenst have all must have roles
        if(allRolesIntersection.size !== mustHaveRolesSet.size) {
            return false
        }
    }
   
    //if ther are roles where only need one
    if(atleastOneRoles.length > 0 ) {
        let atleastOneRolesSet = new Set(atleastOneRoles)
        let atleastOneRolesIntersection = new Set(
            [...atleastOneRolesSet].filter(x => userRolesSet.has(x)));
    
        //if no roles have from atleast need one
        if(atleastOneRolesIntersection.size<1) {
            return false
        }
    }
    
    //passed all checks
    return true
}

export {
    protect,
    authorize,
    RBAC
}