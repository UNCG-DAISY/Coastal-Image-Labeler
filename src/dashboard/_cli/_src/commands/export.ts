import inquirer from 'inquirer'
import {isRequired,yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories,getFiles} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager'

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import {ImageModel} from '../models/Image'
import colorize from '../utils/colorize'
import fs from 'fs'

import moment from 'moment';

const exportCommands = {
    async exportJSON(path:string) {
        
        const fileName = moment().format('MM-DD-YYYY-T-hh-mm-ss').toString()
        const outputPath = `${path}/${fileName}_export.json`
        const allCatalogs = await CatalogModel.find().populate('archives')
        const allArchives = await ArchiveModel.find()
        const allImages= await ImageModel.find()

        console.log(allCatalogs)
        fs.writeFileSync(outputPath, JSON.stringify(allCatalogs));
        return {
            error:false,
            message:`Exported successfuly to ${outputPath}`
        }
    }
}

export default exportCommands;