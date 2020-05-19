
import inquirer from 'inquirer'
import {yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager'

import {CatalogModel} from '../models/Catalog'
import colorize from '../utils/colorize'

const catalog = {
    async addCatalogs(path,options) {
        const dirs = getDirectories(path)
        colorize.info(`Directories are ${dirs.toString()}`)

        //find out which catalogs to add
        let yesNoAns = [];
        for(let i =0; i<dirs.length;i++)
        {   
            const element =dirs[i];

            //if the user wants to select which catalogs to add
            if(!options.all) {
                const input = await inquirer.prompt([
                    {
                        type:'input',
                        name:'shouldAdd',
                        message: `Do you want to add ${element}? (y/n)`.green,
                        validate: yesNoOnly
                    }
                ])
                yesNoAns.push({
                    catalog:element,
                    input:translateYesNoToBool(input.shouldAdd)
                })
            } else {
                //or add all catalogs
                yesNoAns.push({
                    catalog:element,
                    input:true
                })
                
            }        
        }
    
        let entries = []
        //For each catalog that the user said yes to,
        //insert them into the database
        await Promise.all(yesNoAns.map(async (element,index) =>{
            const {catalog,input} = element

            // if(!input) { 
            //     return {error:true,message:'No input'}
            // }

            //if this is catalog to add.
            if(input === true) {
                //first check if this catalog exits
                const catalogPath=`${path}\\${catalog}`
                const doesExistName = await CatalogModel.find({name:catalog})
                const doesExistPath = await CatalogModel.find({path:catalogPath})

                //Dont add if it exists
                if(doesExistName.length>0 || doesExistPath.length>0) {
                    colorize.info(`Catalog ${catalog} already exists`)
                    return
                }

                //create catalog model
                const catalogEntry = await CatalogModel.create({
                    "dateAdded":Date.now(),
                    "name" : catalog,
                    "path" : catalogPath,
                    "taggable": true
                })

                //Say when all catalogs have been made
                colorize.log(`Catalog ${catalog} made`)
                entries.push(catalogEntry)    
            }
            
        }))

        //return the entries that where added
        return {
            error:false,
            message:`${entries.length} catalogs made`,
            data:entries
        }

         
    }
}

export default catalog;