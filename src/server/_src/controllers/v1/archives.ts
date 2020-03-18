/*
    All functions related to archive api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
//import {UserModel} from '../../models/User'
import {ArchiveModel} from '../../models/Archive'
//import {ErrorResponse} from '../../utils/v1/errorResponse'
//import axios from 'axios'

/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/:userId
 * @access      Public
 * @returns     yes
 */
const getAllArchives = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const archives = await ArchiveModel.find()
    
    res.status(200).json({
        success:true,
        data:{
            archives
        }
    })                
})

/**
 * @desc        Gets a archive by ID
 * @route       GET /api/v1/archives/archive/:archiveId/:userId
 * @access      Public
 * @returns     yes
 */
const getArchive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(req?.params?.archiveId) {
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
    getAllArchives,
    getArchive
}