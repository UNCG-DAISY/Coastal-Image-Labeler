/*
    This file is much like /stormSeeder.ts but istead uses json data in /_data
    to create entries in the DB
*/

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
import {RoleModel} from './models/Role'

//Connect to DB
connect(process?.env?.MONGO_URI_DEV as string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

//Read JSON files
const storms = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/fakeStorms.json`,'utf-8')
)

const archives = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/archives.json`,'utf-8')
)

const roles = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/roles.json`,'utf-8')
)


//Function to import into DB
const importData = async () => {
    try {
        await StormModel.create(storms)
        await ArchiveModel.create(archives)
        console.log('Data imported...'.green.inverse)
        process.exit()
    }
    catch(err) {
        console.log(err)
    }
}

//Function to delete data
const deleteData = async () => {
    try {
        await StormModel.deleteMany({})
        await ArchiveModel.deleteMany({})
        await RoleModel.deleteMany({})
        console.log('Data destroyed...'.red.inverse)
        process.exit()
    }
    catch(err) {
        console.log(err)
    }
}

//Function that creates roles
const createRoles = async () => {
    try {
        await RoleModel.create(roles)
        console.log('Roles imported...'.green.inverse)
        process.exit()
    }
    catch(err) {
        console.log(err)
    }
}

//This is a very simple way to get command line argv. If in the future theres a
//need I might use a better way
if(process.argv[2] === '-i') {
    importData()
} else if(process.argv[2] === '-d') {
    deleteData()
} else if(process.argv[2] === '-r') {
    createRoles()
}