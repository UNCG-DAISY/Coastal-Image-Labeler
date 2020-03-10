import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
import {ArchiveModel} from '../../models/Archive'

import {ErrorResponse} from '../../utils/v1/errorResponse'
import {StormModel} from '../../models/Storm'
import axios from 'axios'
import { ObjectID } from "mongodb"

import {UserDocument,StormDocument,ArchiveDocument} from '../../index'
import { promises } from "dns"

/**
 * @desc        Gets all storms
 * @route       GET /api/v1/storms/:userId
 * @access      Public
 * @returns     yes
 */
const getAllStorms = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.advancedResults)
})


/**
 * @desc        Gets all storms
 * @route       GET /api/v1/storms/:userId
 * @access      Public
 * @returns     yes
 */
const getStormsOfUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const storms = res.advancedResults.data
    const userId = req?.params?.userId
    const user:UserDocument = (await UserModel.find({
        "_id":userId
    }))[0]
    const taggableFilter= req?.query?.taggable ?? false

    const stormsOfUser = user.storms
    let data = []

    await Promise.all(storms.map((storm:StormDocument,index:number)=>{
        if(stormsOfUser.includes(storm._id)) {
            let stormOfUser = storm
            let archivesOfStorm:[ArchiveDocument] = stormOfUser.archives
            let taggableArchives:ArchiveDocument[] =archivesOfStorm

            if(taggableFilter) {
                taggableArchives = archivesOfStorm.filter(function(archive) {
                    return archive?.taggable;
                });
                
            }
            stormOfUser.archives = taggableArchives
            data.push(stormOfUser)
        }
    }))
    res.advancedResults.data=data
    res.status(200).json(res.advancedResults)
})

/**
 * @desc        Gets a storm
 * @route       GET /api/v1/storms/storm/:stormId/:userId
 * @access      Public
 * @returns     yes
 */
const getStorm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log(res.advancedResults)
    
    res.status(200).json(res.advancedResults)
})

// /**
//  * @desc        creates a storm
//  * @route       POST /api/v1/storms/storm/
//  * @access      Public
//  * @returns     yes
//  */
// const createStorm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
//     // req.body.id = req.user.id
//     // const new_storm = await StormModel.create(req.body)

//     res.status(201).json({
//         success:false,
//         data:{
//             smile:':}'
//         }
//     })        
// })

export {
    getAllStorms,
    getStorm,
    getStormsOfUser
    //createStorm
}