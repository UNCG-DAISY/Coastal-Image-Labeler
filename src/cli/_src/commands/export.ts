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
import { ImageDocument } from '..'

import unhandledRejection from '../utils/unhandledRejection'
unhandledRejection

const exportCommands = {
    async exportImageTags(path:string) {
        //connect to db
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()

        //Export
        const fileName = moment().format('MM-DD-YYYY-T-hh-mm-ss').toString()
        const outputPath = `${path}/${fileName}_tags_export.json`
        // const allCatalogs = await CatalogModel.find().populate('archives')
        // const allArchives = await ArchiveModel.find()
        //get all images with tags
        const allImages= await ImageModel.find( {tags : {$exists:true}} )
        
        const taggedImages = []

        allImages.map((image:ImageDocument,imageIndex:number)=>{
            if(image.tags.length > 0) {
                console.log(image.tags.length)
                image.tags.map((tag,tagIndex:number)=>{
                    taggedImages.push(tag)
                })
            }
            
        })
        fs.writeFileSync(outputPath, JSON.stringify(taggedImages));

        await mongoConnection.close()
        
        return {
            error:false,
            message:`Exported successfuly to ${outputPath}`
        }

        
        
    },
    async exportJSON(path:string) {
        
        
    }
}



export default exportCommands;