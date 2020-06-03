/*
    All functions related to archive api calls
*/

import { Request,Response,NextFunction } from "express"
 //to avoid putting try catch everywhere
import {asyncHandler} from '../../middleware/v1/async'
import {QuestionSetModel} from '../../models/QuestionSet'
import colorize from '../../utils/v1/colorize'

/**
 * @desc        Gets all archives
 * @route       GET /api/v1/archives/
 * @access      Public
 * @returns     all archives
 */
const getAllQuestionSets = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //get all archives
    // QuestionSetModel.create({
    //     name:"test",
    //     description:'test',
    //     questions:[{}]
    // })
    res.status(200).json({
        success:true,
        message:`${res.advancedResults.length} question sets found`,
        data:{
            questionSets:res.advancedResults
        }
    })                
})

export {
    getAllQuestionSets
}
