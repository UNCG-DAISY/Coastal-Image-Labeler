"use strict";
/*
    This file is much like /stormSeeder.ts but istead uses json data in /_data
    to create entries in the DB
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = require("mongoose");
const colors_1 = __importDefault(require("colors"));
colors_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
// Load env variables
dotenv_1.default.config({
    path: './_config/config.env'
});
//Load models
const Storm_1 = require("./models/Storm");
const Archive_1 = require("./models/Archive");
const Role_1 = require("./models/Role");
//Connect to DB
mongoose_1.connect((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGO_URI_DEV, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
//Read JSON files
const storms = JSON.parse(fs_1.default.readFileSync(`${__dirname}/_data/fakeStorms.json`, 'utf-8'));
const archives = JSON.parse(fs_1.default.readFileSync(`${__dirname}/_data/archives.json`, 'utf-8'));
const roles = JSON.parse(fs_1.default.readFileSync(`${__dirname}/_data/roles.json`, 'utf-8'));
//Function to import into DB
const importData = async () => {
    try {
        await Storm_1.StormModel.create(storms);
        await Archive_1.ArchiveModel.create(archives);
        console.log('Data imported...'.green.inverse);
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
};
//Function to delete data
const deleteData = async () => {
    try {
        await Storm_1.StormModel.deleteMany({});
        await Archive_1.ArchiveModel.deleteMany({});
        await Role_1.RoleModel.deleteMany({});
        console.log('Data destroyed...'.red.inverse);
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
};
//Function that creates roles
const createRoles = async () => {
    try {
        await Role_1.RoleModel.create(roles);
        console.log('Roles imported...'.green.inverse);
        process.exit();
    }
    catch (err) {
        console.log(err);
    }
};
//This is a very simple way to get command line argv. If in the future theres a
//need I might use a better way
if (process.argv[2] === '-i') {
    importData();
}
else if (process.argv[2] === '-d') {
    deleteData();
}
else if (process.argv[2] === '-r') {
    createRoles();
}
