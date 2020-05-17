"use strict";
/*
    Model for tags. Contains a link to the user who created it and what image it is for.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tagDataSchema = new mongoose_1.Schema({
    imageId: {
        required: [true, 'Id of image being tag not passed'],
        type: String
    },
    tag: {
        developmentType: {
            required: [true, 'No development type passed'],
            type: String,
            enum: ['developed', 'undeveloped']
        },
        washoverType: {
            required: [true, 'No washover type passed'],
            type: String,
            enum: ['washover', 'nowashover']
        },
        impactType: {
            required: [true, 'No impact type passed'],
            type: String,
            enum: ['n/a', 'swash', 'collision', 'overwash', 'inundation']
        },
        terrianType: {
            required: [true, 'No terrian type passed'],
            type: [String],
            enum: ['river', 'marsh', 'sandyCoastline']
        }
    },
    taggerId: {
        required: [true, 'TaggerId not passed'],
        type: String
    },
    timeOfTag: {
        type: Date,
        required: [true, 'No time of tag passed']
    },
});
exports.TagDataModel = mongoose_1.model('TagData', tagDataSchema);
