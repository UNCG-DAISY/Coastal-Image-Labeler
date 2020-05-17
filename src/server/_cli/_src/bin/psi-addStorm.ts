import program from 'commander'

program
    .command('default', {isDefault: true})
    .description('Default command, for whatever reason')
    .action(() => {
        console.log('default command for addStorm')
    })

program
    .command('path')
    .description('Path to the storm data')
    .action(() => {
        console.log('path command for addStorm')
    })


program.parse(process.argv)