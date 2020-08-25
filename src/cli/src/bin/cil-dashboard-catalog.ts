import program from 'commander'
import catalog from '../commands/catalog'

import colorize from '../utils/colorize'
program
  .command('add')
  .description('Add Catalogs from JSON file.')
  .option('-p, --path <type>', 'Give path to the JSON file', undefined)
  .action((cmd) => {
    const { path } = cmd

    if (!path) {
      colorize.error('No path provided')
      return
    }
    catalog.add({ path: cmd.path })
  })

program.parse(process.argv)
