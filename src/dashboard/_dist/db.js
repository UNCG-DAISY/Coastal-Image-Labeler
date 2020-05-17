"use strict";
/*
    This exported function connectDB is used to connect to the cloud Mongo DB
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.connectDB = async () => {
    var _a, _b;
    //Get the uri to connect from the enviroment variables. Assume by default to use the development db
    let db_uri = (_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MONGO_URI_DEV;
    //If in production mode, use production db
    if (process.env.NODE_ENV === 'production') {
        //db_uri = process?.env?.MONGO_URI_PRODUCTION
    }
    //Inform which DB using
    console.log(`Using ${process.env.NODE_ENV === 'production' ? 'production' : 'development'} database`.magenta);
    //Connect
    const conn = (await (mongoose_1.connect(db_uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })));
    //Inform that the connection has been made
    console.log(`MongoDB connected: ${(_b = conn === null || conn === void 0 ? void 0 : conn.connection) === null || _b === void 0 ? void 0 : _b.host}`.cyan.underline.bold);
};
