/*
    All functions related to roles api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere

const dummyRes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  
    res.status(200).json({
        success:true,
        message:'I am dummy res',
    })
   
})

export {
    dummyRes
}