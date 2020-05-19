
import colors from 'colors'
colors
import inquirer from 'inquirer'
import {isRequired,yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager'

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import colorize from '../utils/colorize'

const archive = {
    async addArchives(path,catalogId,options) {
        const dirs = getDirectories(path)
        colorize.info(`Archives are ${dirs.toString()}`)

        if(!catalogId) {
            return {
                error:true,
                message:'Please enter a valid catalog _id'
            }
        }

        //check catalogId
        const catalog = CatalogModel.findById(catalogId)
        if(!catalog) {
            return {
                error:true,
                message:`No catalog found with _id ${catalogId}`
            } 
        }

        //check path?

        //find out which archives to add
        const yesNoAns = [];
        for(let i =0; i<dirs.length;i++)
        {   
            const element =dirs[i];
            if(!options.all) {
                const input = await inquirer.prompt([
                    {
                        type:'input',
                        name:'shouldAdd',
                        message: `Do you want to add archive ${element}? (y/n)`.green,
                        validate: yesNoOnly
                    }
                ])
                yesNoAns.push({
                    archive:element,
                    input:translateYesNoToBool(input.shouldAdd)
                })
            } else {
                yesNoAns.push({
                    archive:element,
                    input:true
                })
            }        
        }
        //console.log(yesNoAns) 

        //connect to db
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()
        //await ImageModel.deleteMany({})
        

        let entries = []
        //For each catalog that the user said yes to,
        //insert them into the database
        await Promise.all(yesNoAns.map(async (element,index) =>{
            const {archive,input} = element

            if(input === undefined) { return {error:true,message:'No input'}}

            if(input) {
                 //first check if this catalog exits
                const archivePath=`\\${archive}`
                const doesExistName = await ArchiveModel.find({name:archive})
                const doesExistPath = await ArchiveModel.find({path:archivePath})

                //Dont add if it exists
                if(doesExistName[0] || doesExistPath[0]) {
                    console.log(`Archive ${archive} already exists`.blue)
                    return
                }

                //create storm model
                const archiveEntry = await ArchiveModel.create({
                    "dateAdded":Date.now(),
                    "name" : archive,
                    "path" : archivePath,
                    "taggable": true,
                    "catlog": catalogId,
                })

                //Say when all catalogs have been made
                colorize.info(`Archive ${archive} made`)

                entries.push(archiveEntry)    
            }
           
        }))
        
        await mongoConnection.close()

        //return the entries
        return {
            error:false,
            message:`${entries.length} catalogs made`,
            data:entries
        }

         
    }
}

export default archive;