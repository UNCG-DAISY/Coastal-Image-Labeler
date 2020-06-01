/*
    TODO later once this file is done
*/


import {asyncHandler} from './async'  
import {ErrorResponse} from '../../utils/v1/errorResponse'
import { Request,Response,NextFunction } from "express"
import {rbacJson,UserDocument} from '../../index'
import {UserModel} from '../../models/User'


//Grant access to specific roles
const authorize = (...roles:string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        //if admin, continue
        if(req?.user?.mongoUser?.role.includes('admin') ) {
            return next()
        }

        //if no tag req meet
        if(!req?.user?.mongoUser?.role.includes( ...roles) ) {
            return next(new ErrorResponse(`User/User role ${req?.user?.displayName} is not authorized to access this route`,403))
        }
       
        next()
    }
}

const partOfCatalog = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        console.log(Object.keys(req.user))

        //if no tag req meet
        // if(!req?.user?.mongoUser?.role.includes( ...roles) ) {
        //     return next(new ErrorResponse(`User/User role ${req?.user?.displayName} is not authorized to access this route`,403))
        // }
       
        next()
    }
}



export {
    //protect,
    authorize,
    partOfCatalog
    //RBAC
}