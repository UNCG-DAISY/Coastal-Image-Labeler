"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLogger = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const moment_1 = __importDefault(require("moment")); // require
const cwd = process.cwd();
const logPath = `${cwd}/dashboard_logs`;
const logName = moment_1.default().format('MM-DD-YYYY-T-hh-mm-ss').toString();
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.File({ filename: `${logPath}/${logName}.log` })
    ]
});
exports.logger = logger;
const expressLogger = express_winston_1.default.logger({
    transports: [
        //new winston.transports.Console(),
        new winston_1.default.transports.File({ filename: `${logPath}/${logName}.log` })
    ],
    format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.json(), winston_1.default.format.timestamp(), winston_1.default.format.label()),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});
exports.expressLogger = expressLogger;
