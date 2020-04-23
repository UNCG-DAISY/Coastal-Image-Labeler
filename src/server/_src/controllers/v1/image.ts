/*
    All functions related to user api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {ImageModel} from '../../models/Image'
import {ArchiveModel} from '../../models/Archive'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import axios from 'axios'
import {RBAC} from '../../middleware/v1/auth'
import {UserModel} from '../../models/User'

import {TEST_assignNextImage} from './user'

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
    //console.log(req.body)


    const body = req.body

    let updatePayload = req.body

    //console.log(req.user.mongoUser._id)
    updatePayload.userId = req.user.mongoUser._id

    const imageToUpdate = await ImageModel.findOne({_id:body._id})

    console.log(`Updating image ${imageToUpdate._id}`)
    console.log(`# Tags before ${imageToUpdate?.tags.length}`)
    const upadtedImage = await ImageModel.findByIdAndUpdate(
        body._id,
        { $push: { tags: updatePayload } },
        {
            new:true
        }
    )
    console.log(`# Tags before ${upadtedImage?.tags?.length}`)
    
    //@ts-ignore
    req.params.archive = (await ArchiveModel.findOne({_id:upadtedImage.archive})).name
    next()

    // res.status(200).json({
    //     success:true,
    //     data:{
    //         message:'Image Updated'
    //     }
    // })
  

   
})

export {
    tagImage
}