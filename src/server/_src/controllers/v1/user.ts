import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
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
    })

    if(user.length === 0) {

        const user_entry = await UserModel.create({
            userId:data.id,
            userName:data.username,
            roles:['taggerRole']
        })

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

export {
    isInMongoDB
}