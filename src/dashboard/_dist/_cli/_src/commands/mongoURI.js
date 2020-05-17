"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
colors_1.default;
const inquirer_1 = __importDefault(require("inquirer"));
const UriManager_1 = __importDefault(require("../lib/UriManager"));
const validation_1 = require("../utils/validation");
const mongoURI = {
    async set() {
        //Use the mangager to set the key
        const uriManager = new UriManager_1.default();
        //ask the user a series of questions
        const input = await inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'mongoURI',
                message: 'Enter MongoDB Cloud URI'.green,
                validate: validation_1.isRequired
            }
        ]);
        //Store the key
        const uri = uriManager.setKey(input.mongoURI);
        if (uri) {
            console.log('MongoURI set'.blue);
        }
    },
    show() {
        try {
            //Use manager to get current key
            const uriManager = new UriManager_1.default();
            const uri = uriManager.getKey();
            console.log(`Current MongoURI ${uri.yellow}`);
        }
        catch (error) {
            //if an error
            console.error(error.message.red);
        }
    },
    remove() {
        try {
            //Use manager to delete current key
            const uriManager = new UriManager_1.default();
            uriManager.deleteKey();
            console.log(`Deleted MongoURI key`.blue);
        }
        catch (error) {
            console.error(error.message.red);
        }
    }
};
exports.default = mongoURI;
