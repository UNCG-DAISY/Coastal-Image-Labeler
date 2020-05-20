/*
    All functions related to archive api calls
*/

import { Request,Response,NextFunction } from "express"
 //to avoid putting try catch everywhere
import {asyncHandler} from '../../middleware/v1/async'
import {ArchiveModel} from '../../models/Archive'

/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/
 * @access      Public
 * @returns     all archives
 */
const getAllArchives = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //get all archives
    const archives = await ArchiveModel.find()

    res.status(200).json({
        success:true,
        message:`${res.advancedResults.length} archives found`,
        data:{
            archives:res.advancedResults
        }
    })                
})

/**
 * @desc        Finds an archive 
 * @route       POST /api/v1/archives/FindArchive/
 * @access      Public
 * @returns     all archives specified with req.body
 */
const findArchive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const archives = await ArchiveModel.find(req.body)
    
    res.status(200).json({
        success:true,
        message:'Archive that was found',
        data:{
            archives
        }
    })                
})

export {
    getAllArchives,
    findArchive
}