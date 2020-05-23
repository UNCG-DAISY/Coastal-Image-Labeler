
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
    async addImages(path:string,archiveId) {
        const imageFiles = getFiles(path)
        const archiveEntry = await ArchiveModel.findById(archiveId);
        colorize.log(`Adding ${imageFiles.length} images for archive ${archiveEntry.name}`)
        await Promise.all(imageFiles.map(async (element,index) =>{
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
        }))

        return 
          
    }
}

export default image;