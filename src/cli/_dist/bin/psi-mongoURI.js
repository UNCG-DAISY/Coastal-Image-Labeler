"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = __importDefault(require("commander"));
commander_1.default
    .command('set')
    .description('Set MongoURI')
    .action(() => {
    console.log('set command for MongoURI');
});
commander_1.default.parse(process.argv);
