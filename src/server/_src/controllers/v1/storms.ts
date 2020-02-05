import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import axios from 'axios'

/**
 * @desc        Gets all storms
 * @route       GET /api/v1/storms/:userId
 * @access      Public
 * @returns     yes
 */
const getAllStorms = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(req?.params?.id) {
        //get by user

        res.status(200).json({
            success:true,
            data:{
                
            }
        })        
    }

    //else get all storms
    res.status(200).json({
        success:true,
        data:{
            
        }
    })        
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

export {
    getAllStorms,
    getStorm
}