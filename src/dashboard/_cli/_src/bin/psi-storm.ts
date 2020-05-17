import program from 'commander'
import storms from '../commands/storm'
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

        if(!path) return console.log('Please provide a path')

        // console.log(`Path = ${cmd.path}`)
        // console.log(`Add all as storms = ${cmd.all}`)

        storms.addStorms(cmd.path,{all})
        //console.log(Object.keys(cmd))
    })


program.parse(process.argv)