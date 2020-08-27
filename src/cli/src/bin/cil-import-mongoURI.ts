import program from 'commander'
import mongoURI from '../commands/mongoURI'

program.command('set').description('Set MongoURI').action(mongoURI.set)

program
  .command('show')
  .description('Show current MongoURI')
  .action(mongoURI.show)

program
  .command('remove')
  .description('Remove current MongoURI')
  .action(mongoURI.remove)

program
  .command('test')
  .description('Test MongoDB connection')
  .action(mongoURI.test)

program.parse(process.argv)
