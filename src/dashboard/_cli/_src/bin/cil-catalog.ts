import program from 'commander'
import catalog from '../commands/catalog'

program
    .command('add')
    .description('Add Catalogs from JSON file.')
    .option('-p, --path <type>','Give path to the JSON file',undefined)
    .action((cmd)=> {
        catalog.add({path:cmd.path})
    })

program.parse(process.argv)