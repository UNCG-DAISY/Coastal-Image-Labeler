import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import {StormModel} from '../../models/Storm'
import axios from 'axios'
import { ObjectID } from "mongodb"

/**
 * @desc        Gets all storms
 * @route       GET /api/v1/storms/:userId
 * @access      Public
 * @returns     yes
 */
const getAllStorms = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(req?.params?.userId)
    if(req?.params?.userId) {
        //get by user
        const user = await UserModel.findById(req?.params?.userId)
        const storms_of_user = await StormModel.find({
            creator:req?.params?.userId
        })
        res.status(200).json({
            success:true,
            data:{
                storms:storms_of_user
            }
        })        
    }
    else 
    {
        const storms_of_user = await StormModel.find()
         //else get all storms
        res.status(200).json({
            success:true,
            data:{
                storms:storms_of_user
            }
        })        
    }
   
})

/**
 * @desc        Gets a storm
 * @route       GET /api/v1/storms/storm/:stormId/:userId
 * @access      Public
 * @returns     yes
 */
const getStorm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(req?.params?.stormId) {
        //get a storm

        res.status(200).json({
            success:true,
            data:{
                
            }
        })        
    }

    res.status(201).json({
        success:false,
        data:{
            
        }
    })        
})

// /**
//  * @desc        creates a storm
//  * @route       POST /api/v1/storms/storm/
//  * @access      Public
//  * @returns     yes
//  */
// const createStorm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
//     req.body.id = req.user.id
//     const new_storm = await StormModel.create(req.body)

//     res.status(201).json({
//         success:false,
//         data:{
//             new_storm
//         }
//     })        
// })

export {
    getAllStorms,
    getStorm,
    //createStorm
}