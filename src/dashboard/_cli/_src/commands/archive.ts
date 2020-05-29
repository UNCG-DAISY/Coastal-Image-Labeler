
import colors from 'colors'
colors
import inquirer from 'inquirer'
import {isRequired,yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories,getFiles} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager'

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import colorize from '../utils/colorize'
import image from './image'
import fs from 'fs'

const archive = {
    // async createArchives(options) {
    //     const {
    //         path,
    //         catalogId,
    //         allImages
    //     } = options

    //     if(!path) {return {error:true,errorMessage:'no path passed'}}
    //     if(!catalogId) {return {error:true,errorMessage:'no catalog id passed'}}

    //     //get archives of catalog
    //     const dirs = getDirectories(path)
    //     colorize.info(`Archives are ${dirs.toString()}`)

    //     //check catalogId to see if valid archive
    //     const catalog = CatalogModel.findById(catalogId)
    //     if(!catalog) {return {error:true,message:`No catalog found with _id ${catalogId}`}}

    //     await Promise.all(dirs.map(async(archiveName,index)=> {
    //         const archivePath = `/${archiveName}/jpgs`

    //         //check if archive exists
    //         const existingArchive = await ArchiveModel.find({ 
    //             $or: [ 
    //                 { name: archiveName }, 
    //                 { path: archivePath } 
    //             ] 
    //         })
            
    //         //if exists
    //         if(existingArchive.length>0) {
    //             return colorize.warning(`Archive ${archiveName} exists`)
    //         }

    //         //if not make one
    //         const archiveEntry = await ArchiveModel.create({
    //             "dateAdded":Date.now(),
    //             "name" : archiveName,
    //             "path" : archivePath,
    //             "taggable": true,
    //             "catalog": catalogId,
    //         })

    //         if(allImages) {
    //             await image.addImages(archiveEntry._id)
    //         }
    //     }))
    // },

    // async createSpecificArchive(options) {
    //     const {
    //         path 
    //     } = options
    //     if(!path) {return {error:true,errorMessage:'no path passed'}}

    //     const file = JSON.parse(fs.readFileSync(path, 'utf8'));
        
    //     //connect to db
    //     const uriManager = new UriManager();
    //     const mongoConnection = new MongoConnection(uriManager.getKey())
    //     await mongoConnection.connect()

    //     const archives = file.archives
    //     //console.log(archives)

    //     await Promise.all(archives.map(async (archive,index)=>{

    //         //get catalog and archive name
    //         const pathArray = archive.path.split("/")
    //         const archiveName = pathArray[pathArray.length-1]
    //         const catalogName = pathArray[pathArray.length-2]

    //         //see if archive exists
    //         const existingArchive = await ArchiveModel.find({ 
    //             $or: [ 
    //                 { path: `/${archiveName}` },
    //                 { name: archiveName }
    //             ] 
    //         })
    //         if(existingArchive.length>0) {
    //             return colorize.warning(`Archive ${archiveName} already exists`)
    //         }

    //         //see if catalog exists
    //         const existingCatalog = await CatalogModel.find({ name:catalogName})
    //         if(existingCatalog.length == 0) {
    //             return colorize.warning(`Catalog for ${archiveName} does NOT exists`)
    //         }

    //         //enter into db
    //         const archiveEntry = await ArchiveModel.create({
    //             "dateAdded":Date.now(),
    //             "name" : archiveName,
    //             "path" : `/${archiveName}/jpgs`,
    //             "taggable": archive.taggable,
    //             "catalog": existingCatalog[0]._id,
    //         })
    //         colorize.log(`Archive ${archiveEntry.name} created`)
            
    //         //if create all images flag is given
    //         if(archive.createAllImages) {
    //             await image.addImages(archiveEntry._id)
    //         }
            

    //     }))

    //     //close connection to db
    //     await mongoConnection.close()
    // },

    async createArchive(options) {
        const {
            catalogDoc,
            images,
            appendPath
        } = options

        //Check params
        if(!catalogDoc) {return {error:true,errorMessage:'no catalog passed'}}

        const pathToArchives = `${catalogDoc.path}`
        const archiveFolders = getDirectories(pathToArchives)

        //create each archive
        let archivesMade = []
        await Promise.all(archiveFolders.map(async(archiveName,index)=> {
            const archivePath = `/${archiveName}${appendPath}`

            //check if archive exists
            const existingArchive = await ArchiveModel.find({ 
                $or: [ 
                    { name: archiveName }, 
                    { path: archivePath } 
                ] 
            })
            
            //if exists
            if(existingArchive.length>0) {
                return colorize.warning(`Archive ${archiveName} exists`)
            }

            //if not make one
            const archiveEntry = await ArchiveModel.create({
                "dateAdded":Date.now(),
                "name" : archiveName,
                "path" : archivePath,
                "taggable": true,
                "catalog": catalogDoc._id,
            })
            archivesMade.push(archiveEntry)
            colorize.success(`Archive ${archiveName} made`)
        }))

        await Promise.all(archivesMade.map(async(archiveEntry,index)=> {
           await image.addImages({
               archiveDoc:archiveEntry,
               fileExt:'.jpg'
            })
        }))

    }

}

export default archive;