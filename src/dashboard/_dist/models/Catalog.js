"use strict";
/*
    Model for storms.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogModel = void 0;
const mongoose_1 = require("mongoose");
const catalogScheme = new mongoose_1.Schema({
    // creator: {
    //     type: Types.ObjectId,
    //     required: [true,'Please provide the creator id'],
    // },
    dateAdded: {
        type: Date
    },
    name: {
        type: String,
        required: [true, 'Please provide storm name'],
        unique: true,
        maxlength: [128, 'Name can not be longer than 128 characters']
    },
    path: {
        type: String,
        required: [true, 'Please provide storm path'],
        unique: true,
        maxlength: [128, 'Name can not be longer than 128 characters']
    },
    catalogInfo: {
        year: {
            type: Number,
            required: false
        },
        link: {
            type: String,
            required: false,
        },
        description: {
            type: String,
            required: false
        },
    },
    taggable: {
        type: Boolean,
        required: [true, 'Please provide if storm is taggable or not.'],
    },
    questionSet: {
        type: mongoose_1.Types.ObjectId,
        required: [true, 'Please provide ID of question set'],
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Reverse populate with virtuals
catalogScheme.virtual('archives', {
    ref: 'Archive',
    localField: '_id',
    foreignField: 'catalog',
    justOne: false
});
exports.CatalogModel = mongoose_1.model('Catalog', catalogScheme);
