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

program
  .command('add')
  .description('Add Archive to catalog .')
  .option('-p, --path <type>', 'Give path to JSON file for archive insertion.', undefined)
  .action((cmd) => {
    const { path } = cmd

    if (!path) {
      colorize.error('No path provided')
      return
    }
    //archive.delete({ path: cmd.path })
  })

program.parse(process.argv)
