import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../middleware/async' //to avoid putting try catch everywhere
import {ImageTagModel} from '../models/Tag'
/**
 * @desc        Test tag image
 * @route       GET /api/v1/images/tag
 * @access      Public
 * @returns     yes
 */
const tagImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const image_entry = await ImageTagModel.create(req.body)
    //Send data back
    res.status(201).json({
        success:true,
        data:image_entry
    })
})

const test = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    
    //Send data back
    res.status(201).json({
        success:true,
        data:{
            num:Math.random(),
            date:Date()
        }
    })
})


export {
    tagImage,
    test
}