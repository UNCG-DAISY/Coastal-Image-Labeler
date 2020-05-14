#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
//Cant use import because of TS
//https://stackoverflow.com/a/53836076
const pkg = require('../../package.json');
//These commands have sub commands
//for example, theres a file called psi-mongoURI for the mongoURI command
//and yes they have to follow that name style of
// commandX = psi-commandX
//Now mongoURI has subcommands aswell,but those resolve to direct actions.
//FYI sub sub commands would follow psi-mongoURI-XXX-YYY-ZZZ, also has to be
//in this bin folder 
commander_1.default
    .version(pkg.version)
    .command('mongoURI', 'URI to connect to MongoDB Atlas')
    .command('addStorm', 'Add a storm to the database')
    .command('addArchive', 'Add a archive to the database')
    .parse(process.argv);
