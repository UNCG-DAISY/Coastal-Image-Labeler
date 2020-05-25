/*
    Model for archives. Contains a link to the storm it falls under
*/

import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import slugify from 'slugify'
import { Entry } from 'node-geocoder'
import {ArchiveDocument} from '../index'

const archiveScehma: Schema = new Schema({
    dateAdded:{
        type:Date
    },
    description:{
        type:String
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
    roles:{
        type:[Types.ObjectId],
        default:[]
    },
    catalog: {
        type: Types.ObjectId,
        required: true,
        ref: 'Catalog'
    },
    taggable: {
        type:Boolean,
        required: [true,'Please provide if archive is taggable or not.'],
    }

    
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

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
})


export const ArchiveModel: Model<ArchiveDocument> =  model('Archive', archiveScehma);