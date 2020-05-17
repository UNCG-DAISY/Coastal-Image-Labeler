"use strict";
/*
    The purpose of this file is to take data from the /_data folder and enter
    them into the database. This data is ment for testing and should not exist
    in the production build
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Import packages
const fs_1 = __importDefault(require("fs")); //fs = file system, package to read files
const mongoose_1 = require("mongoose"); //So that we can connect to the cloud DB
const colors_1 = __importDefault(require("colors"));
colors_1.default; //Run the colors package so that we may color the console
const dotenv_1 = __importDefault(require("dotenv")); //Load enviroment variables such as DB connection key
// Load env variables
dotenv_1.default.config({
    path: './_config/config.env'
});
//Load models
const Storm_1 = require("./models/Storm");
const Archive_1 = require("./models/Archive");
const Image_1 = require("./models/Image");
//Function that given a path will run all directories of that path
const getDirectories = (source) => fs_1.default.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
//Function that given a path will return all files of that path
const getFiles = (source) => fs_1.default.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => dirent.name);
//Gets all the names of the storms in the /_data folder
const storms = getDirectories(`${__dirname}/_data/storms`);
const stormData = {};
//Main function, this exists because everything should be done in order and not
//async 
async function Main() {
    var _a;
    //Connect to the DB
    await mongoose_1.connect((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGO_URI_DEV, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    console.log('connected'.green);
    //Delete any existing entries
    await Storm_1.StormModel.deleteMany({});
    await Archive_1.ArchiveModel.deleteMany({});
    await Image_1.ImageModel.deleteMany({});
    //For each storm folder, go through and get each archive. For each archive
    //create an image object and associate a image to an archive and an archive
    //to a storm
    await Promise.all(storms.map(async (storm, index) => {
        //Get all archives of a storm
        const archives = getDirectories(`${__dirname}/_data/storms/${storm}`);
        //@ts-ignore
        stormData[storm] = {
            name: storm,
            archives: {}
        };
        //create storm model
        const stormEntry = await Storm_1.StormModel.create({
            "creator": "5e3b8ad93f4ae346381a2123",
            "dateAdded": Date.now(),
            "name": storm,
            "path": `/_data/storms/${storm}`,
            "taggable": true
        });
        //For each archive    
        for (let i = 0; i < archives.length; i++) {
            let archive = archives[i];
            //create archive model
            const archiveEntry = await Archive_1.ArchiveModel.create({
                "dateAdded": Date.now(),
                "name": archive,
                "path": `/${archive}`,
                "storm": stormEntry._id,
                "taggable": true
            });
            //Get all images of an archive
            let images = getFiles(`${__dirname}/_data/storms/${storm}/${archive}`);
            stormData[storm].archives[archive] = { images };
            //For each image in an archive, create the image model
            for (let i = 0; i < images.length; i++) {
                const fileName = images[i];
                //create image model
                const imageEntry = await Image_1.ImageModel.create({
                    "archive": archiveEntry._id,
                    "compressed": true,
                    "dateAdded": Date.now(),
                    "finishedTagging": false,
                    "id": fileName,
                    "path": `/${fileName}`,
                    "taggable": true,
                    "tillComplete": 2
                });
            }
        }
        //Say when all archives, and all images of each archive have been made.
        console.log(`Storm ${storm} made`.blue);
    }));
    //Exit
    process.exit();
}
Main();
//@ts-ignore
