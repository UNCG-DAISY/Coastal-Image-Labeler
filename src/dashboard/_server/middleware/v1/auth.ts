/*
    TODO later once this file is done
*/


import {asyncHandler} from './async'  
import {ErrorResponse} from '../../utils/v1/errorResponse'
import { Request,Response,NextFunction } from "express"
import {rbacJson,UserDocument} from '../../index'
import {UserModel} from '../../models/User'
import {ArchiveModel} from '../../models/Archive'
import {CatalogModel} from '../../models/Catalog'
import {ImageModel} from '../../models/Image'
// import { Types } from 'mongoose'


//Grant access to specific roles
const authorize = (roles:string) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        const mongoUser = await UserModel.findOne({userId:req.user.id})

        //if no user found
        if(!mongoUser) {
            return next(new ErrorResponse(`User not found`,404))
        }
        
        //if admin, continue
        if(mongoUser.roles.includes('admin') ) {
            return next()
        }

        //if no tag req meet
        if(!mongoUser.roles.includes( roles) ) {
            return next(new ErrorResponse(`User/User role ${req?.user?.displayName} is not authorized to access this route`,403))
        }
       
        next()
    }
}

const partOfCatalog = () => {
    return async (req: Request, res: Response, next: NextFunction) => {

         //if no body
        if(!req.body) {
            return next(new ErrorResponse(`No body sent`,400))
        }

        //Get the mongoDB information on the user
        const mongoUser = await UserModel.findOne({userId:req.user.id})
        const {catalogs} = mongoUser

        //Then get the catalog of the image that is being tagged
        //get image
        const imageId = req.body._id
        const imageDoc = await ImageModel.findById(imageId)
        if(!imageDoc) {
            return next(new ErrorResponse(`Invalid image Id`,400))
        }

        //get archive
        const archiveDoc = await ArchiveModel.findById(imageDoc.archive)
        if(!archiveDoc) {
            return next(new ErrorResponse(`Invalid archive Id`,400))
        }

        //get catalog
        const catalogDoc = await CatalogModel.findById(archiveDoc.catalog)
        if(!catalogDoc) {
            return next(new ErrorResponse(`Invalid catalog Id`,400))
        }

        //check
       if(!catalogs.includes(catalogDoc._id))  {
            res.status(400).json({
                success:false,
                message:`User ${req.user.displayName} not allowed to tag Catalog ${catalogDoc.name}`,
            })
            //return next(new ErrorResponse(`User ${req.user.id} not allowed to tag Catalog ${catalogDoc._id}`,400))
       }
       
        next()
       
    }
}




export {
    //protect,
    authorize,
    partOfCatalog
    //RBAC
}