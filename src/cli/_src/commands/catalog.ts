
import inquirer from 'inquirer'
import colors from 'colors'
colors
import {yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager';
import archive from './archive';

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import {ImageModel} from '../models/Image'
import colorize from '../utils/colorize'

import {isRequired} from '../utils/validation'
import fs from 'fs'

const catalog = {
    async add(options) {
        /** ADDING CATALOG PROCESS */
        /**
         * 1. Get options
         * 2. Check if there already exists a catalog with same name
         * 3. Create catalog
         * 4. Create archives if flag,pass in image flag as well.
         */
        let jsonPath = options.path ?? undefined;
        //if no given path, ask the user to insert one
        if(jsonPath === undefined) {
            //get user input
            const input = await inquirer.prompt([
                {
                    type:'input',
                    name:'jsonPath',
                    message: 'Enter path to JSON file'.green,
                    validate: isRequired
                }
            ])

            jsonPath = input.jsonPath
        }

        //read and show file
        const file = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        
        //connect to db
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()

        //DEV
            await ArchiveModel.deleteMany({})
            await CatalogModel.deleteMany({})
            await ImageModel.deleteMany({})

        //create catalogs
        let catalogsMade = []
        await Promise.all(file.catalogs.map(async (catalogData,index)=> {
            // const {
            
            // } = catalogData

            //get existing catalog, if there is
            const existingCatalog = await CatalogModel.find({ 
                $or: [ 
                    { name: catalogData.name }, 
                    { path: catalogData.path } 
                ] 
            })
            
            //if exists
            if(existingCatalog.length>0) {
                return colorize.warning(`Catalog ${catalogData.name} exists`)
            }

            //if doesnt, make it
            const catalogEntry = await CatalogModel.create({
                "dateAdded":Date.now(),
                "name" : catalogData.name,
                "path" : catalogData.path,
                "taggable": true,
                "catalogInfo": {
                    year:catalogData.year,
                    link:catalogData.link,
                    description:catalogData.description
                },
                "questionSet":catalogData.questionSet
            })

            catalogsMade.push(catalogEntry)
            colorize.success(`Catalog ${catalogData.name} made`)
 
        }))

        //create archives for each catalog
        await Promise.all(catalogsMade.map(async (catalogEntry,index)=> {
            await archive.createArchive({
                catalogDoc:catalogEntry,
                images:true,
                appendPath:'/jpgs',
                file:file
            })
        }))
        await mongoConnection.close()
        
    }
}

export default catalog;