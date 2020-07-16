/*
    All functions related to storm api calls
*/

import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../../middleware/v1/async' //to avoid putting try catch everywhere
import {UserModel} from '../../models/User'
import {ImageModel} from '../../models/Image'
import {ArchiveModel} from '../../models/Archive'
import {CatalogModel} from '../../models/Catalog'
import {UserDocument,CatalogDocument,ArchiveDocument} from '../../index'

import {
    performance
} from 'perf_hooks';

// async function test() {
//     const catalogs = await CatalogModel.find();

//     for(let c = 0; c<catalogs.length;c++) {
        
//         const archives = await ArchiveModel.find({catalog:catalogs[c]._id})
//         let archiveCount = archives.length;
//         let imageCount = 0;
//         for(let a = 0 ;a<archives.length;a++) {
//             const images =  await ImageModel.find({archive:archives[a]._id})
//             imageCount += images.length
//             console.log(`${archives[a].name} has ${images.length} images`)
//         }

//         console.log(`Catalog ${catalogs[c].name} has ${archiveCount} archives and ${imageCount} images`)
//     }
// }
// test()

/**
 * @desc        Gets all storms
 * @route       GET /api/v1/catalogs/
 * @access      Public
 * @returns     yes
 */
const getAllCatalogs = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(res.advancedResults)
})


/**
 * @desc        Gets all storms of a user 
 * @route       GET /api/v1/catalogs/:userId
 * @access      Public
 * @returns     yes
 */
const getCatalogsOfUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

    //Get all storms that gets completed in advResults
    const storms = res.advancedResults.data
    const userId = req?.params?.userId

    /* Have mongo user ID be sent instead */

    //Find the user by id
    const user:UserDocument = (await UserModel.find({
        "_id":userId
    }))[0]

    //Do we want to get all taggable storms/archives of this user, or just all
    const taggableFilter= req?.query?.taggable ?? false

    const stormsOfUser = user.catalogs
    let data = []

    //We have a list of storm ids, we need to get
    //the actual data from those storms
    await Promise.all(storms.map((storm:CatalogDocument,index:number)=>{

        //If that storm is part of the users storms,add it to the data to be returned
        if(stormsOfUser.includes(storm._id)) {
            let stormOfUser = storm
            
            //Get all archives
            let archivesOfStorm:[ArchiveDocument] = stormOfUser.archives
            let archivesToReturn:ArchiveDocument[] = archivesOfStorm

            //If we just want taggalbe archives, filter
            if(taggableFilter) {
                archivesToReturn = archivesOfStorm.filter(function(archive) {
                    return archive?.taggable;
                });   
            }

            //Push this data on to the user and the data to return
            stormOfUser.archives = archivesToReturn
            data.push(stormOfUser)
        }
    }))
    res.advancedResults.data=data
    res.status(200).json(res.advancedResults)
})

/**
 * @desc        Gets the resume tagging information for a user
 * @route       POST /api/v1/catalogs/getUserResumeInfo
 * @access      Public
 * @returns     yes
 */
const getUserResumeInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // console.log('RESUME --- ',res.mongoUser)

    const {
        imagesTagged,
        assignedImages
    } = res.mongoUser

    let resumeObj = {}
    let taggedImagesCategorized = {}

    const t0 = performance.now();
    //Go through the tagged images and group them by catalogs, then by archive
    await Promise.all(imagesTagged.map(async (imageId,index) =>{
        const getImage = await ImageModel.findById(imageId)
        if(!getImage) {return;}

        const getArchive = await ArchiveModel.findById(getImage.archive)
        if(!getArchive) {return;}

        const getCatalog = await CatalogModel.findById(getArchive.catalog)
        if(!getCatalog) {return;}

        const catalogName:any = getCatalog.name
        const archiveName:any = getArchive.name

        //if no entry for this catalog has been made
        if(!taggedImagesCategorized[catalogName]) {
            taggedImagesCategorized[catalogName] = {}
        }

        //if no entry for this archive has been made
        if(!taggedImagesCategorized[catalogName][archiveName]) {
            taggedImagesCategorized[catalogName][archiveName] = 0
        }

        taggedImagesCategorized[catalogName][archiveName] = 1.1//taggedImagesCategorized[catalogName][archiveName] + 1
    }))
    const t1 = performance.now();
    console.log(`Time to group = ${t1-t0} ms`)

    //console.log('taggedImagesCategorized',taggedImagesCategorized)
    //for each assigned image, pull how many you have tagged from that images archive
    //and how many are in that archive
    await Promise.all(Object.keys(assignedImages).map(async (image,index) =>{
        const getImage = await ImageModel.findById(assignedImages[image])
        if(!getImage) {return;}

        const getArchive = await ArchiveModel.findById(getImage.archive)
        if(!getArchive) {return;}

        const getCatalog = await CatalogModel.findById(getArchive.catalog)
        if(!getCatalog) {return;}

        const catalogName:any = getCatalog.name
        const archiveName:any = getArchive.name

        const getTotalImagesArchive = await ImageModel.find({archive:getArchive._id})
        const totalTaggedOfArchive = await ImageModel.find({ tags: { $exists: true, $not: {$size: 0} } })
        
        // console.log('taggedImagesCategorized',taggedImagesCategorized)
        // console.log('catalogName',taggedImagesCategorized[catalogName]?.[archiveName])
        resumeObj[image] = {
            taggedByUser: taggedImagesCategorized?.[catalogName]?.[archiveName] ?? 0,
            totalForArchive:getTotalImagesArchive.length,
            totalTaggedForArchive:totalTaggedOfArchive.length,

            URL:`/auth/tagImage?catalog=${catalogName}&archive=${archiveName}`,
            archiveName: archiveName,
            catalogName: catalogName
        }
    }))

    const t2 = performance.now();
    console.log(`Time to get tagged image/total image = ${t2-t1} ms`)

    return res.status(200).json({
        success:true,
        message:'Done',
        data:{
            resumeObj,
            allImagesTagged:taggedImagesCategorized
            //taggedImagesCategorized
        }
    })
})

/**
 * @desc        Gets the dropdown info for picking a catalog/archive to tag
 * @route       POST /api/v1/catalogs/pickCatalogInfo
 * @access      Public
 * @returns     yes
 */
const pickCatalogInfo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {
       catalogs
    } = res.mongoUser

    let dropdownInfo = {}

    //For each catalog the user is part of, create sub objects where the key is the archives name.
    //then for each archive object keep track of how many images are part of that archive.
    await Promise.all(await catalogs.map(async (catalogId,index)=>{
        //Get fully populated Catalog
        const populatedCatalog = await CatalogModel.findById(catalogId).populate('archives')
        if(!populatedCatalog) {
            return;
        }
        const catalogName = populatedCatalog.name
        dropdownInfo[catalogName] = {}

        //Get the catalog info(year,desc,link) and place them in
        dropdownInfo[catalogName].info = populatedCatalog.catalogInfo

        //Create empty objects where the keys are the names of the archives
        dropdownInfo[catalogName].archives = {}
        populatedCatalog.archives.forEach(element => {
            dropdownInfo[catalogName].archives[element.name] = {}
        });
        
        //How many images are part of this catalog
        let totalImagesOfCatalog = 0

        //For each archive of this catalog
        await Promise.all(await populatedCatalog.archives.map(async (archiveDoc,index)=>{
            
            //Get how many images are part of this archive
            const imagesOfArchive = await ImageModel.find({archive:archiveDoc._id})
            const numImages = imagesOfArchive.length
            const archiveName = archiveDoc.name

            //Add to the archive object the number of images of that archive
            dropdownInfo[catalogName].archives[archiveName].totalImages = numImages
            //Add this same number to the total images of catalog
            totalImagesOfCatalog += numImages
        }))

        dropdownInfo[catalogName].totalImages = totalImagesOfCatalog
        
    }))

    return res.status(200).json({
        success:true,
        message:'Done',
        data:{
            dropdownInfo
        }
    })
})

export {
    getAllCatalogs,
    getCatalogsOfUser,
    getUserResumeInfo,
    pickCatalogInfo
}