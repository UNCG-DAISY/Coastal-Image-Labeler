//command catalog

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

program
  .command('delete')
  .description('Delete Catalog by ID.')
  .option('-i, --id <type>', 'Give ID of Catalog to deelete', undefined)
  .action((cmd) => {
    const { id } = cmd

    if (!id) {
      colorize.error('No ID provided')
      return
    }
    catalog.delete({ id: cmd.id })
  })
program.parse(process.argv)
