import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/v1/geocoder'
import { Entry } from 'node-geocoder'
import {ArchiveDocument} from '../index'

const archiveScehma: Schema = new Schema({
    dateAdded:{
        type:Date
    },
    name : {
        type: String,
        required: [true,'Please provide archive name'],
        unique: true,
        maxlength: [128,'Name can not be longer than 128 characters']
    },
    path : {
        type: String,
        required: [true,'Please provide archive path'],
        unique: true,
        maxlength: [128,'Name can not be longer than 128 characters']
    },
    storm: {
        type: Types.ObjectId,
        required: [true,'Please provide what storm this archive is part of'],
        ref: 'Storm',
        default: []
    },
    taggable: {
        type:Boolean,
        required: [true,'Please provide if archive is taggable or not.'],
    }

    
})

export const ArchiveModel: Model<ArchiveDocument> =  model('Archive', archiveScehma);