/*
    The purpose of this file is to take data from the /_data folder and enter
    them into the database. This data is ment for testing and should not exist
    in the production build
*/

//Import packages
import fs from 'fs' //fs = file system, package to read files
import {connect} from 'mongoose' //So that we can connect to the cloud DB
import colors from 'colors'
colors //Run the colors package so that we may color the console
import dotenv from 'dotenv' //Load enviroment variables such as DB connection key

// Load env variables
dotenv.config({
    path: './_config/config.env'
});

//Load models
import {StormModel} from './models/Storm'
import {ArchiveModel} from './models/Archive'
import {ImageModel} from './models/Image'

//Function that given a path will run all directories of that path
const getDirectories = 
(source:string) => 
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

//Function that given a path will return all files of that path
const getFiles = 
(source:string) => 
    fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name)
 
//Gets all the names of the storms in the /_data folder
const storms =  getDirectories(`${__dirname}/_data/storms`)  
const stormData = {}

//Main function, this exists because everything should be done in order and not
//async 
async function Main() {

    //Connect to the DB
    await connect(process?.env?.MONGO_URI_DEV as string, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    console.log('connected'.green)
    
    //Delete any existing entries
    await StormModel.deleteMany({})
    await ArchiveModel.deleteMany({})
    await ImageModel.deleteMany({})

    //For each storm folder, go through and get each archive. For each archive
    //create an image object and associate a image to an archive and an archive
    //to a storm
    await Promise.all(storms.map(async (storm,index) =>{

        //Get all archives of a storm
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

        //For each archive    
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

            //Get all images of an archive
            let images = getFiles(`${__dirname}/_data/storms/${storm}/${archive}`)
            stormData[storm].archives[archive]={images}

            //For each image in an archive, create the image model
            for(let i=0;i<images.length;i++) {
                const fileName = images[i]
                //create image model
                const imageEntry = await ImageModel.create({
                    "archive":archiveEntry._id,
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

        //Say when all archives, and all images of each archive have been made.
        console.log(`Storm ${storm} made`.blue)
       
        
    }))
    
    //Exit
    process.exit()
}

Main()




//@ts-ignore
