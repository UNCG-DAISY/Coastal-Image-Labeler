"use strict";
/*
    TODO later
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_geocoder_1 = __importDefault(require("node-geocoder"));
//This sets our connection to mapquest so we can use their service for geolocations
const options = {
    provider: process.env.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,
    formatter: null
};
const geocoder = node_geocoder_1.default(options);
exports.geocoder = geocoder;
