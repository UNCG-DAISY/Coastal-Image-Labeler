/*
    All functions related to user api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {ImageModel} from '../../models/Image'
import {ArchiveModel} from '../../models/Archive'
import {CatalogModel} from '../../models/Catalog'
import fs from 'fs'
//import {RBAC} from '../../middleware/v1/auth'

//import {TEST_assignNextImage} from './user'

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
 * @returns     no
 */
const tagImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    /* TAGGING PROCESS*/
    /*
        1. Error check inputs
        2. Get the image that is being tagged
        3. Check to see if any tags match the new tag
        4. Update
        5. See if can finalize tags
        6. Update res object
    */

    /* Step 1 */
    const {
        _id,
        tags,
        timeEnd,
        timeStart
    } = req.body
    

    //just take the stuff we need
    let taggingPayload = {
        _id,
        tags,
        timeEnd,
        timeStart
    }

    /* Step 2 */
    let taggedImage = await ImageModel.findById(_id)
    //Get the current tagging state(should be true) for future use
    let stillTaggable = taggedImage.taggable

    /* Step 3 */
    //if this image has tags
    if(taggedImage.tags.length > 0) {
        let stringifyedTaggingPayload = JSON.stringify(taggingPayload.tags)
        let numMatched = 1 //image matches with self

        //Go through each currentee tag and compare
        for(let i = 0; i<taggedImage.tags.length;i++) {
            //Get the current tag and convert to a string
            //@ts-ignore
            const temp_tag = JSON.stringify(taggedImage.tags[i].tags)

            //Compare the new tag and the currently selected tag
            if(temp_tag === stringifyedTaggingPayload) {
                numMatched++;
            }
        }
        
        //if enough match,then we can mark the image as complete
        if(numMatched == taggedImage.tillComplete) {
            console.log(`image ${_id} NOT LONGER taggable`)
            stillTaggable = false     
        } else {
            console.log(`image ${_id} STILL taggable`)
        }
    } else {
        //if theres no tags, no need to even try
        console.log('ONLY 1 TAG EXISTS')
    }

    /* Step 4 */
    //Update
    let upadtedImage = await ImageModel.updateOne(
        {_id:_id},
        { $push: { tags: taggingPayload },taggable:stillTaggable },
        {
            runValidators:true,
            new:true
        }
    )

    /* Step 5*/
    if(stillTaggable == false) {
        upadtedImage = await ImageModel.updateOne(
            {_id:_id},
            { finalTag:taggingPayload },
            {
                runValidators:true,
                new:true
            }
        )
    }
    
    //Not sure if I need this, just getting the latest image
    upadtedImage = await ImageModel.findById(_id) 

    /* Step 6 */
    //@ts-ignore
    res.updatedImage = upadtedImage
    //@ts-ignore
    req.params.archive = (await ArchiveModel.findOne({_id:upadtedImage.archive})).name
    //Attach the newly tagged image to the res object
    next()
})

/**
 * @desc        Tags an image
 * @route       GET /api/v1/images/show/:id
 * @access      Public
 * @returns     no
 */
const showImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if(req.params.id === undefined) {
        res.status(404).json({
            success:false,
            message:'No Id sent',
        })
    }

    const imageDoc = await ImageModel.findOne({id:req.params.id})
    if(!imageDoc) {
        return res.status(404).json({
            success:false,
            message:'No image found',
        })
        //return next()
    }
    //console.log('img',imageDoc)

    const archiveDoc = await ArchiveModel.findById(imageDoc.archive)
    if(!archiveDoc) {
        return res.status(404).json({
            success:false,
            message:'No archive found',
        })
        //return next()
    }
    //console.log('archive',archiveDoc)
    //console.log('---------',archiveDoc.catalog,'=========')
    const catalogDoc = await CatalogModel.findById(archiveDoc.catalog)
    //console.log('catalog',catalogDoc)
    if(!catalogDoc) {
        return res.status(404).json({
            success:false,
            message:'No catalog found',
        })
        //return next()
    }
    
    res.sendFile(`${catalogDoc.path}/${archiveDoc.path}/${req.params.id}`);
    // res.sendFile('C:\\Users\\skool\\Desktop\\testCatalogs\\amenadiel\\a420\\420_test.png');
})

export {
    tagImage,
    showImage
}