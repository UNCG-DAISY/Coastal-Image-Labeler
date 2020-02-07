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


//Import into DB
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

//Delete data
const deleteData = async () => {
    try {
        await StormModel.deleteMany({})
        await ArchiveModel.deleteMany({})
        console.log('Data destroyed...'.red.inverse)
        process.exit()
    }
    catch(err) {
        console.log(err)
    }
}

//Too much work to get an argv package
if(process.argv[2] === '-i') {
    importData()
} else if(process.argv[2] === '-d') {
    deleteData()
}