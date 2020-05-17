"use strict";
/*
    Model for storms.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stormSchema = new mongoose_1.Schema({
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
    stormInfo: {
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
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Reverse populate with virtuals
stormSchema.virtual('archives', {
    ref: 'Archive',
    localField: '_id',
    foreignField: 'storm',
    justOne: false
});
exports.StormModel = mongoose_1.model('Storm', stormSchema);
