/*
    All functions related to user api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
//import {RoleModel} from '../../models/Role'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import axios from 'axios'
import {ArchiveModel} from '../../models/Archive'
import {ImageModel} from '../../models/Image'

/**
 * @desc        Gets a user by id
 * @route       GET /api/v1/users/findUser
 * @access      Public
 * @returns     yes
 */
const findUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    /* FIDNING USER PROCESS*/
    /*
        1. Check if a body was sent
        2. Query with the body
        3. Adjust return message
    */
    if(req.body) {
        //get user
        const user  = await UserModel.findOne(req.body)
        let message = 'User does not exist'

        //if user does exist
        if(user) {
            message = 'User exists in DB'
        }

        //return
        res.status(200).json({
            success:true,
            message,
            data:{
                user
            }
        }) 
    }
    else {
    //if no body data was sent
        res.status(400).json({
            success:false,
            data:{
                message:'No body data sent'
            }
        }) 
    }
    
})

//Perhaps this should be only allowed by logged in users
/**
 * @desc        Creates a user with the given passport user properties
 * @route       POST /api/v1/users/:id
 * @access      Private
 * @returns     yes
 */
const createNewUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    /* CREATING USER PROCESS*/
    /*
        1. Check if a body was sent
        2. check if  displayName and id sent
        3. create user
        4. return
    */

    //console.log(req.body)
    const {passportUser} = req.body

    //no passport bbody
    if(!passportUser) {
        res.status(200).json({
            success:false,
            message:'No passport object sent'
        }) 
        return next()
    }

    const {displayName,id} = passportUser
    //if no displayName or id passed
    if(!displayName || !id) {
        res.status(400).json({
            success:true,
            data:null
        }) 
        return next()
    }

    //create the user
    let user_entry = await UserModel.create({
        userId:id,
        userName: displayName,
        dateAdded:Date.now()
    })

    //return
    console.log('New user made'.bgMagenta)
    res.status(200).json({
        success:true,
        message:'New User made',
        data:{
            user:user_entry
        }
    }) 
})

/**
 * @desc        Gets allowedPages of this user
 * @route       GET /api/v1/users/isUser
 * @access      Public
 * @returns     yes
 */
const allowedPages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  

    /* ALLOWED PAGES PROCESS*/
    /*
        1. check if id was sent
        2. Get user
        3. check if user
        4. check rolenames
        5. return
    */

    const id = req?.params?.id || undefined
    const defaultAllowed = {
        tagger:false
    }

    //if no id sent
    if(id === undefined) {
        res.status(400).json({
            success:true,
            message:'No Id sent',
            data:{
               allowedPages:defaultAllowed
            }
        })
        return next()
    }
    
    //get user
    const user = await UserModel.findOne({userId:id})
    
    //if no user
    if(user == undefined || user == null) {
        res.status(400).json({
            success:true,
            message:'No user found',
            data:{
               allowedPages:defaultAllowed
            }
        })
    }

    //console.log(user)
    //compare role names to pages needed
    const {roles} = user
    //console.log(roles,'------------------')
    const pagesAllowed = {
        tagger: roles.includes("tagger")
    }

    res.status(200).json({
        success:true,
        message:'allowed pages found',
        data:{
            allowedPages:pagesAllowed
        }
    })  
})

/**
 * @desc        Gets a users current image given storm and archive
 * @route       GET /api/v1/users/getImage/:storm/:archive
 * @access      Public
 * @returns     yes
 */
const getAssignedImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    /* GET ASSINGED IMAGE PROCESS*/
    /*
        1. check if archive is sent
        2. check if user is sent
        3. get user object
        4. check to see if there is an assignedImages prop
        5. if there is no assingedImages prop, create one
        6. Then check if there is an assinged image for archive, if
        so send it back, if not then get one.

        7. If no images are assigned, assign one by
            a. Getting all images that can be tagged of that archive
            b. Getting all images that have been tagged by this user
            c. Filter .b out of .a
        8. Then select the first taggable image and assign it
        9. If there are none, then set undefined
        10. return
    */

    //get passed in params
    const {archive} = req?.params
    const {user} = req

    //check user and archive params
    if(!user) {
        res.status(400).json({
            success:true,
            message:"No user sent",
        })    
        return next()
    }
    if(!archive) {
        res.status(400).json({
            success:true,
            message:"No archive sent",
        })    
        return next()
    }

    //get user
    const userId = user.mongoUser._id;
    const userDocument = (await UserModel.findById(userId))
    //get all assigned images
    let getAssignedImages = userDocument.assignedImages

    //If theres no assignedImages property
    //then create one
    if(!getAssignedImages) {
        getAssignedImages = (await UserModel.findByIdAndUpdate(
            userId,
            {
                assignedImages:{}
            },
            {
                new:true,
                runValidators:true
            }
        )).assignedImages
    } 

    //Get the currently assigned image of the archive
    let assignedImageOfArchive = getAssignedImages[archive]

    //If there is an image assigned already, send it back
    if(assignedImageOfArchive) {

        const assignedImageDocument = await ImageModel.findById(assignedImageOfArchive)
        res.status(200).json({
            success:true,
            message:"Assigned Image found",
            data:{
                image:assignedImageDocument
            }
        })
        return next()
    }

    //If theres no image assigned

    //First find the archive with this name
    const archiveDocument = (await ArchiveModel.find({name:archive}))[0]

    //Get the list of images already tagged by this user
    const listOfTaggedImagesOfUser = userDocument.imagesTagged

    //Get the list of all images that can be tagged
    const listOfPossibleTaggableImages = (await ImageModel.find({
        archive:archiveDocument._id,
        taggable:true,
        tillComplete: { $gt: 0 }
    }))

    //Filter out the images that have been tagged
    let newImagesForUser = listOfPossibleTaggableImages.filter(function (image) {
        return !listOfTaggedImagesOfUser.includes(image._id)
    });

    //of the images that can be tagged, get the first one
    const firstPossibleTaggableImage = newImagesForUser[0];
    
    //If there is a image that can be tagged, give it back, else tell them 
    //theres no more images to tag.
    if(firstPossibleTaggableImage) {
        //Now update user document with the new image
        (await UserModel.findByIdAndUpdate(
            userId,
            {
                assignedImages:{
                    [archive]:firstPossibleTaggableImage._id,
                    ...getAssignedImages
                }
            },
            {
                runValidators:true
            }
        ))

        //send back
        res.status(200).json({
            success:true,
            message:"No image was assigned therefore assigned image",
            data:{
                image:firstPossibleTaggableImage
            }
        })
    } else {
        //No new images availible, so update user doc to reflect this
        (await UserModel.findByIdAndUpdate(
            userId,
            {
                assignedImages:{
                    [archive]:undefined,
                    ...getAssignedImages
                }
            },
            {
                runValidators:true
            } 
        ))

        res.status(200).json({
            success:true,
            message:"No more images to tag in this archive",
            data:{
                image:undefined
            }
        })
    }
   
})

/**
 * @desc        Updates the list of tagged images,by taking the currently assigned and putting it in tagged list
 * @route       POST /api/v1/images/tagImage
 * @access      Public
 * @returns     yes
 */
const updatedTaggedImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    /* UPDATE TAGGED IMAGES PROCESS*/
    /*
        1. check if user is sent
        2. check if archive is sent
        3. add currently assigned image of archive to tagged list
        4. remove that archive from assinged list
        5. return
    */

    const {user} = req
    
    //We need the archive so we know which image to cycle off into tagged list
    const {archive} = req?.params

    if(!user || !archive) {
        res.status(200).json({
            success:false,
            message:"No user or archive sent",
        })
        return next()
    }

    //get user doc
    const userId = user?.mongoUser._id
    const userDocument = (await UserModel.findById(userId))

    //get the current list of tagged images
    let newListOfTaggedImages = userDocument.imagesTagged
    //add the currently assigned image for the archive to the tagged list
    newListOfTaggedImages.push(userDocument.assignedImages[archive]);

    //remove that archive, which means no image is assigned from that archive
    let newAssignedImages = userDocument.assignedImages
    delete newAssignedImages[archive];

    //update model
    (await UserModel.findByIdAndUpdate(
        userId,
        {
            assignedImages:{
                ...newAssignedImages
            },
            imagesTagged:newListOfTaggedImages
        },
        {
            runValidators:true
        }
    ));

    res.status(200).json({
        success:true,
        message:"Cycled to next image",
    })
})

export {
    //getUserRoles,
    findUser,
    //checkUserRoles,
    createNewUser,
    allowedPages,
    getAssignedImage,
    updatedTaggedImages
}