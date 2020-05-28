import program from 'commander'
import catalog from '../commands/catalog'
import archive from '../commands/archive'
import colorize from '../utils/colorize'

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import UriManager from '../lib/UriManager'
import MongoConnection from '../lib/MongoConnection'

import exportCommands from '../commands/export'
// program
//     .command('default', {isDefault: true})
//     .description('Default command, for whatever reason')
//     .action(() => {
//         console.log('default command for addStorm')
//     })

program
    .command('json', {isDefault: true})
    .description('Export all collections for ML use to a folder')
    .option('-p, --path <type>','Give path to directory to place collections',undefined)
    .action(async (cmd) => {
        const {
            path,
            csv
        } = cmd

        //make sure a path is given
        if(!path) return colorize.warning('Please provide a path')
    
        //connect to db
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()

        //Export
        const exportResult = await exportCommands.exportJSON(path)//{error:undefined,message:'1'};

        //if an error, report it.
        if(exportResult.error) {
            colorize.error(exportResult.message)
        } else {
            colorize.info(exportResult.message)
        }
        await mongoConnection.close()
    })


program.parse(process.argv)