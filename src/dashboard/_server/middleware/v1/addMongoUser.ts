/*
    TODO later once this file is done
*/
import {ErrorResponse} from '../../utils/v1/errorResponse'
import { Request,Response,NextFunction } from "express"
import {UserModel} from '../../models/User'

// import { Types } from 'mongoose'


//Grant access to specific roles
const addMongoUser = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const mongoUser = await UserModel.findOne({userId:req.user.id})

        //if no user found
        if(!mongoUser) {
            return next(new ErrorResponse(`User not found`,404))
        }
        console.log('add mongo user')
        res.mongoUser = mongoUser
        next()
    }
}

export {
    addMongoUser,  
}