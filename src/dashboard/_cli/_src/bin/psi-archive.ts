import program from 'commander'
import colorize from '../utils/colorize'

program
    .command('path')
    .description('Path to the archive data')
    .action(() => {
        console.log('path command for addArchive')
    })

program.parse(process.argv)