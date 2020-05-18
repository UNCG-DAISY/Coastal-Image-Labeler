import program from 'commander'
import catalog from '../commands/catalog'
// program
//     .command('default', {isDefault: true})
//     .description('Default command, for whatever reason')
//     .action(() => {
//         console.log('default command for addStorm')
//     })

program
    .command('add')
    .description('Path to the storm data')
    .option('-p, --path <type>','Give path to the storms',undefined)
    .option('-a, --all','Add all folders of --path as a storm',false)
    .action((cmd) => {
        const {
            path,
            all
        } = cmd

        //make sure a path is given
        if(!path) return console.log('Please provide a path')

        catalog.addCatalogs(cmd.path,{all})
    })


program.parse(process.argv)