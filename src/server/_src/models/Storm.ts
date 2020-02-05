import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/v1/geocoder'
import { Entry } from 'node-geocoder'
import {StormDocument} from '../index'

const stormSchema: Schema = new Schema({
    archives: {
        type: [Types.ObjectId],
        ref: 'Archive',
        default: []
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
    taggable: {
        type:Boolean,
        required: [true,'Please provide if storm is taggable or not.'],
    },

    
})

export const StormModel: Model<StormDocument> =  model('Storm', stormSchema);