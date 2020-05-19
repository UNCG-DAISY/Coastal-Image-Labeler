import program from 'commander'
import colorize from '../utils/colorize'
import archive from '../commands/archive'
import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import {ImageModel} from '../models/Image'
import UriManager from '../lib/UriManager'
import MongoConnection from '../lib/MongoConnection'

program
    .command('add')
    .description('Path to the archive data')
    .option('-p, --path <type>','Give path to the archives',undefined)
    .option('-a, --all','Add all directories of --path as archives',false)
    .option('-i, --images','Add all images of the archive',false)
    .action(async (cmd) => {
        const {
            path,
            all,
            images
        } = cmd

        //make sure a path is given
        if(!path) return console.log('Please provide a path')

        //connect to db
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()

        //TEST COMMAND
            //await CatalogModel.deleteMany({})
            await ArchiveModel.deleteMany({})
            await ImageModel.deleteMany({})

        //first check to see if the catalog exists
        const pathArray = path.split("\\")
        const catalogName = pathArray[pathArray.length-1]

        console.log(images,'==============')
        const catalog = await CatalogModel.findOne({name:catalogName})
        const archiveResult = await archive.addArchives(path,catalog._id,{all,images})

        await mongoConnection.close()
    })

program.parse(process.argv)