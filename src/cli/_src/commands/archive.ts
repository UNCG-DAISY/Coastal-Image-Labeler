
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

        // await Promise.all(archivesMade.map(async(archiveEntry,index)=> {
        //    await image.addImages({
        //        archiveDoc:archiveEntry,
        //        fileExt:'.jpg'
        //     })
        // }))

        for(let i=0;i<archivesMade.length;i++) {
            await image.addImages({
                archiveDoc:archivesMade[i],
                fileExt:'.jpg'
            })
            
        }
    }

}

export default archive;