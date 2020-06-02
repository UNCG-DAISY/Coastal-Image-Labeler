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
    .option('-p, --path <type>','Give path to the JSON file',undefined)
    .action(async (cmd) => {
        const {
            path,
        } = cmd

        //archive.createSpecificArchive({path:path})

    })

program.parse(process.argv)