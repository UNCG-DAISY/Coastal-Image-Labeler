#!/usr/bin/env node

import program from 'commander'

//Cant use import because of TS
//https://stackoverflow.com/a/53836076
const pkg = require('../../package.json')

program
  .version(pkg.version)
  .command('mongoURI', 'URI to connect to MongoDB Atlas')
  .command('catalog', 'Add catalog(s) to the database')
  // // .command('archive', 'Add archive(s) of a catalog to the database')
  // // .command('image', 'Add compressed images')
  // .command('export', 'Export the data for ML use.')
  .parse(process.argv)
