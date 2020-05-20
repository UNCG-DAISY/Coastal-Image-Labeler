/*
    All functions related to user api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
import {RoleModel} from '../../models/Role'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import axios from 'axios'
import {ArchiveModel} from '../../models/Archive'
import {ImageModel} from '../../models/Image'


/**
 * @desc        Gets all roles of a user
 * @route       GET /api/v1/users/isUser
 * @access      Public
 * @returns     yes
 */
const getUserRoles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const userId = req?.body?.id

    //If no user id sent
    if(!userId) {
        return next(new ErrorResponse(`Please send a userId`,400))
    }
    
    //Call the auth0 api to get uses of the user
    const options:any = {
        method: 'GET',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`,
        headers:{
            authorization: `Bearer ${global.MANGAGEMENT_TOKEN}`
        }
    };
    
    //Call auth0 api for user roles
    const role_data:[any] = (await axios.get(options.url,options)).data
    
    let roles = []

    //Since array of roles,just get the important stuff
    role_data.forEach(role => {
        roles.push({
            role:role.name,
            role_description:role.description
        })
    });

    res.status(200).json({
        success:true,
        data:{
           roles:roles
        }
    })
   
})

/**
 * @desc        Gets a user by id
 * @route       GET /api/v1/users/findUser
 * @access      Public
 * @returns     yes
 */
const findUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    //console.log(Object.keys(req),'---')
    //if a body data was sent
    if(req.body) {
        const user  = await UserModel.findOne(req.body).populate('roleData')
        
        let message = 'User does not exist'
        if(user) {
            message = 'User exists in DB'
        }

        res.status(200).json({
            success:true,
            data:{
                message,
                user
            }
        }) 
    }
    else {
    //if no body data was sent
        res.status(400).json({
            success:true,
            data:{
                message:'No body data sent'
            }
        }) 
    }
    
})

/**
 * @desc        Given a user id, and an array of roles, check if user has those roles
 * @route       GET /api/v1/users/:id
 * @access      Public
 * @returns     yes
 */
const checkUserRoles = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    //Get user and roles
    const user  = await UserModel.findById(req?.params?.id).populate('roleData')
    const userRoles = user.roleNames

    //get allowed roles
    const allowedRoles = req?.body?.allowedRoles ?? []

    //Make allowed roles and user roles into set, do intersection and see whats result
    const user_roles_set:Set<string> = new Set(userRoles)
    const roles_set:Set<string> = new Set(allowedRoles)

    const role_intersection:Set<string> = new Set(
        [...user_roles_set].filter(x => roles_set.has(x)));

    //If theres no common roles, denied
    if(role_intersection.size === 0) {
        res.status(200).json({
            success:true,
            data:{
                message: 'Denied',
                allowed:false
            }
        }) 
    }
    else {
        //If theres atleast 1 common role, allowed
        res.status(200).json({
            success:true,
            data:{
                message: 'Allowed',
                allowed:true
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
    
    //console.log(req.body)
    const {passportUser} = req.body
    const {displayName,id} = passportUser

    //console.log(`${displayName} ${id}`.green)
    //if no displayName or id passed
    if(!displayName || !id) {
        res.status(400).json({
            success:true,
            data:null
        }) 
    }
   
    let user_entry = await UserModel.create({
        userId:id,
        userName: displayName
        //dateAdded:Date.now()
    })

    console.log('New user made'.bgMagenta)

    res.status(200).json({
        success:true,
        data:{
            message:'New User made',
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
    // console.log(req?.params?.id)

    const id = req?.params?.id || undefined
    const defaultAllowed = {
        tagger:false
    }

    //if no id sent
    if(id === undefined) {
        res.status(400).json({
            success:false,
            data:{
               allowedPages:defaultAllowed
            }
        })
    }
    else {
        //console.log(`${id}`.red)
        const user = await UserModel.findOne({userId:id}).populate('roleData')
        //console.log(`${user}`.red)
        //console.log(user)
        if(user) {
            //console.log('user does exist'.red)
            const {roleNames} = user

            const pagesAllowed = {
                tagger: roleNames.includes("tagger")
            }
            res.status(200).json({
                success:true,
                data:{
                    allowedPages:pagesAllowed
                }
            })
        } else {
            //console.log('NO user does exist'.red)
            res.status(200).json({
                success:true,
                data:{
                    allowedPages:defaultAllowed
                }
            })
        }
        
    }

   
})

/**
 * @desc        Gets a users current image given storm and archive
 * @route       GET /api/v1/users/getImage/:storm/:archive
 * @access      Public
 * @returns     yes
 */
const getAssignedImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    const {archive} = req?.params
    const {user} = req

    //If no user was passed
    if(!user) {
        res.status(400).json({
            success:true,
            data:{
            message:"No user sent",
            }
        })    
    } else {
        const userId = user.mongoUser._id;
        const userDocument = (await UserModel.findById(userId))
        let getAssignedImages = userDocument.assignedImages

        //If theres no assignedImages property
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
        } else {
            //If theres no image assigned

            //First find the archive with this name
            const archiveDocument = (await ArchiveModel.find({name:archive}))[0]

            //We need to make sure that we dont give an image already tagged by the user
            const listOfTaggedImagesOfUser = userDocument.imagesTagged

            const listOfPossibleTaggableImages = (await ImageModel.find({
                archive:archiveDocument._id,
                taggable:true,
                tillComplete: { $gt: 0 }
            }))

            var newImagesForUser = listOfPossibleTaggableImages.filter(function (image) {
                return !listOfTaggedImagesOfUser.includes(image._id)
            });

            console.log('Images not tagged by user are length',newImagesForUser.length)
            const firstPossibleTaggableImage = newImagesForUser[0];
           
            //If there is a image that can be tagged, give it back, else tell them 
            //theres no more images to tag.
            if(firstPossibleTaggableImage) {
                 //Now update user document
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

                res.status(200).json({
                    success:true,
                    message:"No image was assigned therefore assigned image",
                    data:{
                        image:firstPossibleTaggableImage
                    }
                })
            } else {
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
           
        }

    }
    
   
})

//this cycles to the next possible image to tag
const updatedTaggedImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {user} = req
    //We need the archive so we know which image to cycle off into tagged list
    const {archive} = req?.params
    const userId = user?.mongoUser._id
  
    const userDocument = (await UserModel.findById(userId))

    
    //console.log(userDocument.userName)
    let newListOfTaggedImages = userDocument.imagesTagged
    //const imageAdding = userDocument.assignedImages[archive]
    newListOfTaggedImages.push(userDocument.assignedImages[archive]);

    let newAssignedImages = userDocument.assignedImages
    delete newAssignedImages[archive];

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
    getUserRoles,
    findUser,
    checkUserRoles,
    createNewUser,
    allowedPages,
    getAssignedImage,
    updatedTaggedImages
}