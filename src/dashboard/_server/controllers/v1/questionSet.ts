/*
    All functions related to archive api calls
*/

import { Request,Response,NextFunction } from "express"
 //to avoid putting try catch everywhere
import {asyncHandler} from '../../middleware/v1/async'
import {QuestionSetModel} from '../../models/QuestionSet'
import {CatalogModel} from '../../models/Catalog'
import colorize from '../../utils/v1/colorize'

/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/
 * @access      Public
 * @returns     all archives
 */
const getAllQuestionSets = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success:true,
        message:`${res.advancedResults.length} question sets found`,
        data:{
            questionSets:res.advancedResults
        }
    })                
})

/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/
 * @access      Public
 * @returns     all archives
 */
const getCatalogQuestionSet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.body) {
        return res.status(400).json({
            success:false,
            message:"No body sent",
        })    
        
    }

    if(!req.body.catalogName) {
        return res.status(400).json({
            success:false,
            message:"No catalog name sent",
        })    
        
    }
    const {catalogName} = req.body
    const catalogDoc = await CatalogModel.findOne({name:catalogName})
    if(!catalogDoc) {
        return res.status(400).json({
            success:false,
            message:`No catalog with name ${catalogName} found`,
        })    
        
    }

    const questionSetDoc = await QuestionSetModel.findById(catalogDoc.questionSet)
    if(!questionSetDoc) {
        return res.status(400).json({
            success:false,
            message:`No question set with UD ${catalogDoc.questionSet} found`,
        })   
    }

    res.status(200).json({
        success:true,
        message:`${req.body.catalogName} question set found`,
        data:{
            questionSets:questionSetDoc
        }
    })                
})

export {
    getAllQuestionSets,
    getCatalogQuestionSet
}
