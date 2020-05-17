"use strict";
/*
    Model for images. Contains a link to the archive it falls under
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
    archive: {
        type: mongoose_1.Types.ObjectId,
        required: [true, 'Please which archives this image is in'],
    },
    compressed: {
        type: Boolean,
        required: [true, 'Please tell if compressed or not'],
    },
    dateAdded: {
        type: Date
    },
    finalTag: {
        type: Object
    },
    finishedTagging: {
        type: Boolean,
        required: [true, 'Please tell if compressed or not'],
    },
    location: {
        upperLeft: {
            type: [Number]
        },
        upperRight: {
            type: [Number]
        },
        lowerLeft: {
            type: [Number]
        },
        lowerRight: {
            type: [Number]
        }
    },
    id: {
        type: String,
        required: [true, 'Please add a name of image with its extension'],
        unique: true,
        trim: true,
        maxlength: [128, 'Name can not be longer than 128 characters']
    },
    path: {
        type: String,
        required: [true, 'Please provide image path'],
        unique: true,
        maxlength: [128, 'Name can not be longer than 128 characters']
    },
    taggable: {
        type: Boolean,
        required: [true, 'Please tell if this image is taggable or not'],
    },
    taggedTimes: {
        type: [Date]
    },
    tags: {
        type: [Object]
    },
    tillComplete: {
        type: Number,
        required: [true, 'Please tell how many times two or more taggers must agree till complete'],
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// ImageSchema.post('save', function(doc) {
//     console.log('%s has been saved', doc._id);
//   });
exports.ImageModel = mongoose_1.model('Image', ImageSchema);
