"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
const mongoURI_1 = __importDefault(require("../commands/mongoURI"));
commander_1.default
    .command('set')
    .description('Set MongoURI')
    .action(mongoURI_1.default.set);
commander_1.default
    .command('show')
    .description('Show current MongoURI')
    .action(mongoURI_1.default.show);
commander_1.default
    .command('remove')
    .description('Remove current MongoURI')
    .action(mongoURI_1.default.remove);
commander_1.default.parse(process.argv);
