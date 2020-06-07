#!/usr/bin/env node

import program from 'commander'
import colorize from '../utils/colorize'
//Cant use import because of TS
//https://stackoverflow.com/a/53836076
const pkg = require('../../package.json')

//These commands have sub commands
//for example, theres a file called psi-mongoURI for the mongoURI command
//and yes they have to follow that name style of
// commandX = psi-commandX
//Now mongoURI has subcommands aswell,but those resolve to direct actions.

//FYI sub sub commands would follow psi-mongoURI-XXX-YYY-ZZZ, also has to be
//in this bin folder 
program
    .version(pkg.version)
    .command('mongoURI', 'URI to connect to MongoDB Atlas')
    .command('catalog', 'Add catalog(s) to the database')
    .command('archive', 'Add archive(s) of a catalog to the database')
    .command('image', 'Add compressed images')
    .command('export', 'Export the data for ML use.')
    .parse(process.argv)
