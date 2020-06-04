"use strict";
/*
    Model for archives. Contains a link to the storm it falls under
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchiveModel = void 0;
const mongoose_1 = require("mongoose");
const archiveScehma = new mongoose_1.Schema({
    dateAdded: {
        type: Date
    },
    description: {
        type: String
    },
    name: {
        type: String,
        required: [true, 'Please provide archive name'],
        unique: true,
        maxlength: [128, 'Name can not be longer than 128 characters']
    },
    path: {
        type: String,
        required: [true, 'Please provide archive path'],
        unique: true,
        maxlength: [128, 'Name can not be longer than 128 characters']
    },
    roles: {
        type: [mongoose_1.Types.ObjectId],
        default: []
    },
    catalog: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: 'Catalog'
    },
    taggable: {
        type: Boolean,
        required: [true, 'Please provide if archive is taggable or not.'],
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// archiveScehma.virtual('allImages', {
//     ref: 'Image',
//     localField: '_id',
//     foreignField: 'archive',
//     justOne: false
// })
archiveScehma.virtual('getCatalog', {
    ref: 'Catalog',
    localField: 'catalog',
    foreignField: '_id',
    justOne: false
});
exports.ArchiveModel = mongoose_1.model('Archive', archiveScehma);
