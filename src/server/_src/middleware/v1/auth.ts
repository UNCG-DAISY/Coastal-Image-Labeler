/*
    TODO later once this file is done
*/


import {asyncHandler} from './async'  
import {ErrorResponse} from '../../utils/v1/errorResponse'
import { Request,Response,NextFunction } from "express"
import {rbacJson,UserDocument} from '../../index'
import {UserModel} from '../../models/User'

//protect routes

// const protect = asyncHandler(async(req: Request, res: Response, next: NextFunction) => {
//     let token;
    
//     if(!req?.user) {
//         //res.redirect('/');
//         return next(new ErrorResponse('Not authorized to access this route',401))
//     }
    
//     //User is good to access
//     next()
// })

//Grant access to specific roles
const authorize = (...roles:string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        console.log('Must have role = ',roles)
        console.log('User has = ',req?.user?.mongoUser?.role)
        console.log(Object.keys(req.user))

        if(!req?.user?.mongoUser?.role.includes( ...roles)) {
            return next(new ErrorResponse(`User/User role ${req?.user?.displayName} is not authorized to access this route`,403))
        }
       
        next()
    }
}



export {
    //protect,
    authorize,
    //RBAC
}