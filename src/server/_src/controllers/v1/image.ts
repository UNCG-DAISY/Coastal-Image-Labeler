/*
    All functions related to user api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {ImageModel} from '../../models/Image'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import axios from 'axios'
import {RBAC} from '../../middleware/v1/auth'
import {UserModel} from '../../models/User'

// async function test() {
//     const allImages = await ImageModel.find();
    
//     //@ts-ignore
//     allImages.forEach(async image => {
//         console.log('Updating',image.id,image.archive[0])
        
//         const x = await ImageModel.findByIdAndUpdate(
//             image._id,
//             {
//                archive:image.archive 
//             },
//             {
//                 new:true
//             }
//         )
//         console.log(image.archive,x.archive)
//     });
// }
// test()
/**
 * @desc        Tags an image
 * @route       POST /api/v1/images/tagImage
 * @access      Public
 * @returns     yes
 */
const tagImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req?.params?.id)
    console.log(req.body)
    //@ts-ignore
    console.log(Object.keys(req.session))

    const body = req.body
    
    //
    const imageToUpdate = await ImageModel.findOne({_id:body.imageId})
    
    await ImageModel.findOneAndUpdate(
        {
            _id:body.imageId
        }, 
        {
           tags:[
               ...imageToUpdate.tags,
                {
                   type:body.type,
                   tags:body.tags,
                   date:Date.now()
                }
            ]
        }, 
        {
            new: true
        }
    )
    console.log(`image ${body.imageId} has been tagged`)

    res.status(200).json({
        success:true,
        data:{
            message:'hi'
        }
    })
  

   
})

export {
    tagImage
}