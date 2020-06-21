// import inquirer from 'inquirer'
// import {isRequired,yesNoOnly,translateYesNoToBool} from '../utils/validation'
// import {getDirectories,getFiles} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager'

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import {ImageModel} from '../models/Image'
import colorize from '../utils/colorize'
import fs from 'fs'

import moment from 'moment';

import unhandledRejection from '../utils/unhandledRejection'
import image from './image'
unhandledRejection

const exportCommands = {
    async exportImageCollection(path:string) {
        //connect to db
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()

        //Export
        const fileName = moment().format('MM-DD-YYYY-T-hh-mm-ss').toString()
        const outputPath = `${path}/${fileName}_tags_export.json`
        let outputData = []

        const catalogs = await CatalogModel.find()
        //let test = 0;
        let imgCount=0;
        for(let i =0;i<catalogs.length;i++) {
            imgCount=0;
            const catalog = catalogs[i];
            console.log(`Catalog ${catalog.name}`);
            const archives = await ArchiveModel.find({
                catalog:catalog._id
            })

            for(let j=0;j<archives.length;j++) {
                const archive = archives[j];
                const images = await ImageModel.find({
                    archive:archive._id
                })

                for(let k=0;k<images.length;k++) {
                    let image = images[k];

                    // if(test ==0) {
                    //     console.log(image)
                    // }
                    // test++;
                    imgCount++;
                    outputData.push({
                        image,
                        archiveName:archive.name,
                        catalogName:catalog.name
                    })
                }
            }

            console.log(`${imgCount} Images, for total of ${outputData.length}`)
        }

        fs.writeFileSync(outputPath, JSON.stringify(outputData));
        console.log(`File written to ${outputPath}`);
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