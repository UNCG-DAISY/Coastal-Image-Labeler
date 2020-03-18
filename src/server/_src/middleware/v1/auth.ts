/*
    TODO later once this file is done
*/


import {asyncHandler} from './async'  
import {ErrorResponse} from '../../utils/v1/errorResponse'
import { Request,Response,NextFunction } from "express"

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

export {
    protect,
    authorize
}