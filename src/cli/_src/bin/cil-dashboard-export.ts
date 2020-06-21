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
    .command('image')
    .description('Export all images to a folder')
    .option('-p, --path <type>','Give path to directory to place JSON file',undefined)
    .action(async (cmd) => {
        const {
            path
        } = cmd

        //make sure a path is given
        if(!path) return colorize.warning('Please provide a path')
        await exportCommands.exportImageCollection(path)
        
    })

    
program.parse(process.argv)