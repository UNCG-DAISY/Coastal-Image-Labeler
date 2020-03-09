import fs from 'fs'
import {connect} from 'mongoose'
import colors from 'colors'
colors
import dotenv from 'dotenv'

// Load env variables
dotenv.config({
    path: './_config/config.env'
});

//Load models
import {StormModel} from './models/Storm'
import {ArchiveModel} from './models/Archive'
import {ImageModel} from './models/Image'
import { func } from 'prop-types'

const getDirectories = 
(source:string) => 
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

const getFiles = 
(source:string) => 
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)
    
const storms =  getDirectories(`${__dirname}/_data/storms`)  

const stormData = {}



async function Main() {
    await connect(process?.env?.MONGO_URI_DEV as string, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    console.log('connected'.green)
    
    await StormModel.deleteMany({})
    await ArchiveModel.deleteMany({})
    await ImageModel.deleteMany({})

    await Promise.all(storms.map(async (storm,index) =>{
        const archives = getDirectories(`${__dirname}/_data/storms/${storm}`)  
        //@ts-ignore
        stormData[storm] = {
            name:storm,
            archives:{}
        }
    
        //create storm model
        const stormEntry = await StormModel.create({
            "creator": "5e3b8ad93f4ae346381a2123",
            "dateAdded":Date.now(),
            "name" : storm,
            "path" : `/_data/storms/${storm}`,
            "taggable": true
        })

        
        //console.log(stormEntry)
        for(let i=0;i<archives.length;i++) {
            let archive = archives[i]
    
            //create archive model
            const archiveEntry = await ArchiveModel.create({
                "dateAdded":Date.now(),
                "name" : archive,
                "path" : `/${archive}`,
                "storm": stormEntry._id,
                "taggable": true
            })
            let images = getFiles(`${__dirname}/_data/storms/${storm}/${archive}`)
            stormData[storm].archives[archive]={images}

            for(let i=0;i<images.length;i++) {
                const fileName = images[i]
                //create image model
                const imageEntry = await ImageModel.create({
                    "archive":[archiveEntry._id],
                    "compressed" : true,
                    "dateAdded" : Date.now(),
                    "finishedTagging": false,
                    "id": fileName,
                    "path":`/${fileName}`,
                    "taggable":true,
                    "tillComplete":4

                })
            }
    
        }
        console.log(`Storm ${storm} made`.blue)
       
        
    }))
    
    process.exit()
}

Main()




//@ts-ignore
