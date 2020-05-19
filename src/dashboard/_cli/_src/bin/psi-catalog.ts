import program from 'commander'
import catalog from '../commands/catalog'
import archive from '../commands/archive'
import colorize from '../utils/colorize'

import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import UriManager from '../lib/UriManager'
import MongoConnection from '../lib/MongoConnection'

// program
//     .command('default', {isDefault: true})
//     .description('Default command, for whatever reason')
//     .action(() => {
//         console.log('default command for addStorm')
//     })

program
    .command('add')
    .description('Path to the storm data')
    .option('-p, --path <type>','Give path to the catalogs',undefined)
    .option('-a, --all','Add all directories of --path as a catalog',false)
    .option('-arc, --addArchives','Add all subdirectories of each catlog as an archive',false)
    .option('-arcAll, --allArchives','Add all subdirectories of each catlog as an archive',false)
    .action(async (cmd) => {
        const {
            path,
            all,
            addArchives,
            allArchives
        } = cmd

        //TEST COMMAND
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()
        await CatalogModel.deleteMany({})
        await ArchiveModel.deleteMany({})
        await mongoConnection.close()

        //make sure a path is given
        if(!path) return console.log('Please provide a path')

        const catalogResult = await catalog.addCatalogs(cmd.path,{all})

        if(catalogResult.error) {
            colorize.error(catalogResult.message)
            return
        }

        //if archive option is true, then create the archives
        if(addArchives) {
            colorize.log(`Inserting archives for the ${catalogResult.data.length} created catalogs`)
            for(let i =0;i<catalogResult.data.length;i++) {
                const element = catalogResult.data[i]
                const {
                    name,path,_id
                } = element
 
                await archive.addArchives(path,_id,{all:allArchives})

            }
        }
    })


program.parse(process.argv)