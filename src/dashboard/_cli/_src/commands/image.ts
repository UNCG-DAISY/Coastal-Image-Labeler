
import colors from 'colors'
colors
import inquirer from 'inquirer'
import {isRequired,yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories,getFiles} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager'

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import {ImageModel} from '../models/Image'
import colorize from '../utils/colorize'

const image = {
    async addImages(options) {

        const {
            archiveDoc,
            fileExt
        } = options

        const archiveId = archiveDoc._id

        const archiveEntry = await ArchiveModel.findById(archiveId)
        if(!archiveEntry) {return colorize.warning(`No archive with id ${archiveId}`)}
        const catalogEntry = await CatalogModel.findById(archiveEntry.catalog)
        const path = `${catalogEntry.path}${archiveEntry.path}`

        const imageFiles = getFiles(path,fileExt)
        // colorize.error(path)

        colorize.log(`Adding ${imageFiles.length} images for archive ${archiveEntry.name}`)
        await Promise.all(imageFiles.map(async (element,index) =>{

            //first check if this image exists
            const existingImage = await ArchiveModel.find({ 
                $or: [ 
                    { id: element }, 
                    { path: `/${element}` } 
                ] 
            })

            //if exists
            if(existingImage.length>0) {
                colorize.warning(`Image ${element} exists`)
            }
            else {
                const imageEntry = await ImageModel.create({
                    "archive":archiveId,
                    "compressed" : true,
                    "dateAdded" : Date.now(),
                    "finishedTagging": false,
                    "id": element,
                    "path":`/${element}`,
                    "taggable":true,
                    "tillComplete":2
                })
            }
            
        }))
        colorize.success(`Done adding ${imageFiles.length} images for archive ${archiveEntry.name}`)

        //colorize.log(`Done adding ${imageFiles.length} images`) 
          
    }
}

export default image;