
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
        const totalImages = imageFiles.length
        colorize.log(`Adding ${totalImages} images for archive ${archiveEntry.name}`)
        let numImagesAdded = 0;
        await Promise.all(imageFiles.map(async (element,index) =>{

            //first check if this image exists
            const existingImage = await ImageModel.find({ 
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
                numImagesAdded ++;
                switch (numImagesAdded) {
                    case Math.floor(0.25*totalImages):
                        colorize.log(`Added 25% of ${totalImages} images for archive ${archiveEntry.name}`)
                        break;

                    case Math.floor(0.5*totalImages):
                        colorize.log(`Added 50% of ${totalImages} images for archive ${archiveEntry.name}`)
                        break;

                    case Math.floor(0.75*totalImages):
                        colorize.log(`Added 75% of ${totalImages} images for archive ${archiveEntry.name}`)
                        break;
                   
                    default:
                        break;
                }
            }
            
        }))
        colorize.success(`Done adding ${totalImages} images for archive ${archiveEntry.name}`)
          
    }
}

export default image;