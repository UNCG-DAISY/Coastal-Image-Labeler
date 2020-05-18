
import colors from 'colors'
colors
import inquirer from 'inquirer'
import {isRequired,yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories} from '../utils/file'
import MongoConnection from '../lib/MongoConnection'
import UriManager from '../lib/UriManager'

import {StormModel} from '../models/Storm'

const catalog = {
    async addCatalogs(path,options) {
        const dirs = getDirectories(path)
        console.log(`Directories are ${dirs}`.blue)

        //find out which catalogs to add
        const yesNoAns = [];
        for(let i =0; i<dirs.length;i++)
        {   
            const element =dirs[i];
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
                    storm:element,
                    input:translateYesNoToBool(input.shouldAdd)
                })
            } else {
                yesNoAns.push({
                    catalog:element,
                    input:true
                })
            }        
        }
        console.log(yesNoAns) 

        //connect to db
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()
        
        

        await Promise.all(yesNoAns.map(async (element,index) =>{
            const {catalog,input} = element

            if(!input) { return }

            //first check if this catalog exits
            const catalogPath=`${path}\\${catalog}`
            const doesExistName = await StormModel.find({name:catalog})
            const doesExistPath = await StormModel.find({path:catalogPath})

            //Dont add if it exists
            if(doesExistName[0] || doesExistPath[0]) {
                console.log(`Catalog ${catalog} already exists`.blue)
                return
            }

            //create storm model
            const stormEntry = await StormModel.create({
                "dateAdded":Date.now(),
                "name" : catalog,
                "path" : catalogPath,
                "taggable": true
            })

            //Say when all catalogs have been made
            console.log(`Catalog ${catalog} made`.magenta)
           
            
        }))
        await mongoConnection.close()

         
    }
}

export default catalog;