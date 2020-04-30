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
//         //console.log('Updating',image.id,image.archive[0])
        
//         const x = await ImageModel.findByIdAndUpdate(
//             image._id,
//             {
//                tillComplete:2
//             },
//             {
//                 new:true
//             }
//         )
//         //console.log(image.archive,x.archive)
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
    let stillTaggable = true
    console.log(`Updating image ${imageToUpdate._id}`)
    console.log(`# Tags before ${imageToUpdate?.tags.length}`)

    //Before we tag lets check and see if any tags match
    if(imageToUpdate.tags.length > 0) {
        let string_payload = JSON.stringify(updatePayload.tags)
        let number_matched = 1 //image matches with self
        for(let i = 0; i<imageToUpdate.tags.length;i++) {
            
            //@ts-ignore
            const temp_tag = JSON.stringify(imageToUpdate.tags[i].tags)

            //console.log(temp_tag,string_payload)
            if(temp_tag === string_payload) {
                number_matched = number_matched +1;
            }
        }
        
        //if enough match
        if(number_matched == imageToUpdate.tillComplete) {
            console.log(`image ${imageToUpdate._id} NOT LONGER taggable`)
            stillTaggable = false
            
        } else {
            console.log(`image ${imageToUpdate._id} STILL taggable`)
        }
    } else {
        //if theres no tags, no need to even try
        console.log('ONLY 1 TAG EXISTS')
    }
    
    let upadtedImage = await ImageModel.updateOne(
        {_id:body._id},
        { $push: { tags: updatePayload },taggable:stillTaggable },
        {
            runValidators:true,
            new:true
        }
    )
    upadtedImage = await ImageModel.findById(body._id) 


    console.log(`# Tags before ${upadtedImage?.tags?.length}`)
    
    //@ts-ignore
    req.params.archive = (await ArchiveModel.findOne({_id:upadtedImage.archive})).name
    next()


   
})

export {
    tagImage
}