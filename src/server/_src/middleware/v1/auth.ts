
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
        const userId = req.user.id
        const mongoUser = req.user.mongoUser
        const userRoles = mongoUser.roles

        if(!roles.includes(userRoles)) {
            return next(new ErrorResponse(`User role ${req?.user?.role} is not authorized to access this route`,403))
        }
        next()
    }
}

export {
    protect,
    authorize
}