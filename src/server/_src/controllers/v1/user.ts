/*
    All functions related to user api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
import {RoleModel} from '../../models/Role'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import axios from 'axios'
import {RBAC} from '../../middleware/v1/auth'
import {ArchiveModel} from '../../models/Archive'
import {ImageModel} from '../../models/Image'

//import {rbacJson,UserDocument} from '../../index'
//This is probablly a deprecated function
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
        const user = await UserModel.findOne({userId:id}).populate('roleData')
        //console.log(user)

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
    }

   
})

/**
 * @desc        Gets a users current image given storm and archive
 * @route       GET /api/v1/users/getImage/:storm/:archive
 * @access      Public
 * @returns     yes
 */
const getImageFromStorm = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const {storm,archive} = req?.params
    //console.log(storm,archive,'server')

    //@ts-ignore
    //console.log(Object.keys(req))
    const {user} = req

    const _id = user.mongoUser._id;

    //console.log(user.mongoUser,'serverrrrr',_id)
    const userEntry = (await UserModel.findById(_id))
    
    let assignedImageProperty = userEntry?.assignedImages
    let assignedImage = undefined;

    if(assignedImageProperty) {
        assignedImage = assignedImageProperty[archive]
    }

    let foundImage = false
    //no image from this archive assigned to user
    if(!assignedImage) {
        console.log('Looking for archive by name',archive)

        //const imagesOfArchive = 
        const archiveEntry = (await ArchiveModel.findOne({name:archive}).populate('allImages'))
        const imagesOfArchive = archiveEntry.allImages;

        
        for(let i =0;i<imagesOfArchive.length;i=i+1) {
            if(imagesOfArchive[i].taggable && imagesOfArchive[i].tillComplete > 0) {
                
                foundImage = true
                const imageToAssign = (imagesOfArchive[i])._id

                if(userEntry.assignedImages === undefined) {
                    userEntry.assignedImages = {}
                }
                userEntry.assignedImages[archive] = imageToAssign
                const newUser = await UserModel.findByIdAndUpdate(_id,{
                    assignedImages: {
                        ...userEntry.assignedImages,
                        [archive]:imageToAssign
                    }
                },{new:true,runValidators:true})
            
                console.log(newUser)
                assignedImage = imageToAssign
                i = imagesOfArchive.length +1;
            }
            // console.log(imagesOfArchive[i].id)
        }
        
        //@ts-ignore
        //console.log(archive,archiveEntry)
    }

    const userEntry2 = (await UserModel.findById(_id))
    
    const imageEntry = await ImageModel.findById(userEntry2.assignedImages[archive]);
    //console.log(userEntry)
    res.status(200).json({
        success:true,
        data:{
        message:"Hello",
        data:{
            assignedImage:imageEntry
        }
        }
    })
   
    
   
})

export {
    getUserRoles,
    findUser,
    checkUserRoles,
    createNewUser,
    allowedPages,
    getImageFromStorm
}