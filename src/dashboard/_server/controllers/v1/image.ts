/*
    All functions related to user api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {ImageModel} from '../../models/Image'
import {ArchiveModel} from '../../models/Archive'
import {CatalogModel} from '../../models/Catalog'
import fs from 'fs'
import _ from 'lodash'
import compress_images from 'compress-images'
import { UserModel } from "../../models/User"

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
            For this I add archive of the image as a param,and the newly updated image
            for the next callback function, updatedTaggedImages, which cycles the image
            off from being assigned to tagged and assigns a new image.
    */

    /* Step 1 */
    const {
        _id,
        tags,
        timeEnd,
        timeStart
    } = req.body
    
    //first get user
    const mongoUser = await UserModel.findOne({userId:req.user.id})
    tags.userId = mongoUser._id
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
        //Do a deep copy so we can delete keys
        let currentSubmittedTag =  _.cloneDeep(taggingPayload.tags)
        //no need to compare the comments
        delete currentSubmittedTag["comments"]

        let numMatched = 1 //tag matches with self

        //Go through each currentee tag and compare
        for(let i = 0; i<taggedImage.tags.length;i++) {
            //Get the current tag and convert to a string
            //Do a deep copy so we can delete keys
            const previouslySavedTag = _.cloneDeep((taggedImage.tags[i] as any).tags)
            //no need to compare the comments, so make it undefined
            delete previouslySavedTag["comments"]

            //Compare the new tag and the currently selected tag
            if(_.isEqual(currentSubmittedTag,previouslySavedTag)) {
                numMatched++;
            }
        }
        
        //if enough match,then we can mark the image as complete
        if(numMatched >= taggedImage.tillComplete) {
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
    let upadtedImage = await ImageModel.findOneAndUpdate(
        {_id:_id},
        { $push: { tags: taggingPayload },taggable:stillTaggable },
        {
            runValidators:true,
            new:true
        }
    )   
    
    /* Step 5*/
    if(stillTaggable == false) {
        upadtedImage = await ImageModel.findOneAndUpdate(
            {_id:_id},
            { 
                finalTag:taggingPayload,
                taggable:false,
                finishedTagging:true 
            },
            {
                runValidators:true,
                new:true
            }
        )
    }
    
    //Make sure to get the latest image
    //upadtedImage = await ImageModel.findById(_id) 

    /* Step 6 */
    //@ts-ignore
    res.updatedImage = upadtedImage
    //@ts-ignore
    const imageArchive = await ArchiveModel.findOne({_id:upadtedImage.archive})
    req.params.archive = (imageArchive).name
    //Attach the newly tagged image to the res object
    next()
})

/**
 * @desc        Tags an image
 * @route       GET /api/v1/images/show/:id
 * @access      Public
 * @returns     no
 */

const showImage = (options:any) => {
    return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if(req.params.id === undefined) {
            res.status(404).json({
                success:false,
                message:'No Id sent',
            })
        }
        
        //First we need to get the images path, from archive and catalog
        const imageDoc = await ImageModel.findById(req.params.id)
        if(!imageDoc) {
            return res.status(404).json({
                success:false,
                message:'No image found',
            })
    
        }
    
        const archiveDoc = await ArchiveModel.findById(imageDoc.archive)
        if(!archiveDoc) {
            return res.status(404).json({
                success:false,
                message:'No archive found',
            })
    
        }
    
        const catalogDoc = await CatalogModel.findById(archiveDoc.catalog)
        if(!catalogDoc) {
            return res.status(404).json({
                success:false,
                message:'No catalog found',
            })
    
        }

        const uncompressedImagePath = `${catalogDoc.path}/${archiveDoc.path}/${imageDoc.fileName}`
        const compressedPath = `${process.env.COMPRESS_FOLDER}/${catalogDoc.name}${archiveDoc.path}/`
        const compressedImagePath = `${compressedPath}${imageDoc.fileName}`
        if(options.compress) {

            //if the compressed file exists
            if (fs.existsSync(compressedImagePath)) {
                console.log(`Sending compressed image ${imageDoc.fileName} at path ${compressedImagePath}`)
                res.sendFile(compressedImagePath)
            } else {
                //if not, send uncompressed
                console.log(`No compressed found for ${compressedImagePath}. Sending uncompressed image ${imageDoc.fileName} at path ${uncompressedImagePath}`)
                res.sendFile(uncompressedImagePath);
            }
            
        }
        else {
            console.log(`Sending uncompressed image ${imageDoc.fileName} at path ${uncompressedImagePath}`)
            res.sendFile(uncompressedImagePath);
        }
        
    })
}

/**
 * @desc        Exports all tags of all images as CSV
 * @route       GET /api/v1/images/export
 * @access      Public
 * @returns     yes
 */
const exportAsCSV = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //Logic for converting to csv
    //read json from db
    //do stuff with json
    //parse json to csv
    //write to the vm
    const file = fs.readFileSync('path to newly made csv')

    // res.header('Content-Type', 'text/csv');
    // res.attachment('test.csv');
    return res.send(file);
    
})

export {
    tagImage,
    showImage,
    exportAsCSV
}