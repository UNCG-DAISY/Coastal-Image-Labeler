import program from 'commander'
import archive from '../commands/archive'

import colorize from '../utils/colorize'
program
  .command('delete')
  .description('Delete Archive by ID.')
  .option('-i, --id <type>', 'Give ID of Archive to deelete', undefined)
  .action((cmd) => {
    const { id } = cmd

    if (!id) {
      colorize.error('No ID provided')
      return
    }
    archive.delete({ id: cmd.id })
  })

program.parse(process.argv)
