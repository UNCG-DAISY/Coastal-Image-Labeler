import program from 'commander'

program
    .command('set')
    .description('Set MongoURI')
    .action(() => {
        console.log('set command for MongoURI')
    })

program.parse(process.argv)