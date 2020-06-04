"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
colors_1.default;
const logger_1 = require("./logger");
const colorize = {
    error(input) {
        console.log(input.red);
        logger_1.logger.error(input);
    },
    success(input) {
        console.log(input.green);
        logger_1.logger.info(input);
    },
    warning(input) {
        console.log(input.yellow);
        logger_1.logger.warn(input);
    },
    info(input) {
        console.log(input.cyan);
        logger_1.logger.info(input);
    },
    log(input) {
        console.log(input.grey);
        logger_1.logger.info(input);
    },
};
exports.default = colorize;
