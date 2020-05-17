"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configstore_1 = __importDefault(require("configstore"));
const pkg = require('../../package.json');
class UriManager {
    constructor() {
        this.conf = new configstore_1.default(pkg.name);
    }
    setKey(key) {
        this.conf.set('mongoUriKey', key);
        return key;
    }
    getKey() {
        const key = this.conf.get('mongoUriKey');
        if (!key) {
            throw new Error('No mongoURI Found ');
        }
        return key;
    }
    deleteKey() {
        const key = this.conf.get('mongoUriKey');
        if (!key) {
            throw new Error('No mongoURI Found ');
        }
        this.conf.delete('mongoUriKey');
        return;
    }
}
exports.default = UriManager;
