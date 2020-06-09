import program from 'commander'
import catalog from '../commands/catalog'

program
    .command('add')
    .description('Add Catalogs from JSON file.')
    .option('-p, --path <type>','Give path to the JSON file',undefined)
    .option('-D, --dev <type>','Dev mode to delete catalogs,archive and images before insert',false)
    .action((cmd)=> {
        catalog.add({path:cmd.path,dev:cmd.dev})
    })

program.parse(process.argv)