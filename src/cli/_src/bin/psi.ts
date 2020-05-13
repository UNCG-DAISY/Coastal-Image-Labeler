#!/usr/bin/env node

import program from 'commander'

//Cant use import because of TS
//https://stackoverflow.com/a/53836076
const pkg = require('../../package.json')

program
    .version(pkg.version)
    .command('mongoURI', 'URI to connect to MongoDB Atlas')
    .command('addStorm', 'Add a storm to the database')
    .command('addArchive', 'Add a archive to the database')
    .parse(process.argv)

console.log('Main file')
