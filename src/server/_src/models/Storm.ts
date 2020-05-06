/*
    Model for storms.
*/


import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import {StormDocument} from '../index'

const stormSchema: Schema = new Schema({
    // archives: {
    //     type: [Types.ObjectId],
    //     ref: 'Archive',
    //     default: []
    // },
    creator: {
        type: Types.ObjectId,
        required: [true,'Please provide the creator id'],
    },
    dateAdded:{
        type:Date
    },
    name : {
        type: String,
        required: [true,'Please provide storm name'],
        unique: true,
        maxlength: [128,'Name can not be longer than 128 characters']
    },
    path : {
        type: String,
        required: [true,'Please provide storm path'],
        unique: true,
        maxlength: [128,'Name can not be longer than 128 characters']
    },
    stormInfo:{
        year:{
            type:Number,
            required:false
        },
        link:{
            type:String,
            required:false,
        },
        description:{
            type:String,
            required:false
        },

    },
    taggable: {
        type:Boolean,
        required: [true,'Please provide if storm is taggable or not.'],
    },

    
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}

)

// Reverse populate with virtuals
stormSchema.virtual('archives', {
    ref: 'Archive',
    localField: '_id',
    foreignField: 'storm',
    justOne: false
});


export const StormModel: Model<StormDocument> =  model('Storm', stormSchema);