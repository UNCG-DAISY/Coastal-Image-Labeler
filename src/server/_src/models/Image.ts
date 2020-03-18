/*
    Model for images. Contains a link to the archive it falls under
*/


import { Schema, model, Model, Document, HookNextFunction, Types} from 'mongoose'
import {ImageDocument} from '../index'

const ImageSchema: Schema  = new Schema(
    {
        archive:{
            type:[Types.ObjectId],
            required: [true,'Please which archives this image is in'],
        },
        compressed: {
            type: Boolean,
            required: [true,'Please tell if compressed or not'],
          
        },
        dateAdded:{
            type:Date
        },
        finishedTagging: {
            type: Boolean,
            required: [true,'Please tell if compressed or not'],
          
        },
        location:{
            upperLeft:{
                type:[Number]
            },
            upperRight:{
                type:[Number]
            },
            lowerLeft:{
                type:[Number]
            },
            lowerRight:{
                type:[Number]
            }
        },
        id : {
            type: String,
            required: [true,'Please add a name of image with its extension'],
            unique: true,
            trim:true,
            maxlength: [128,'Name can not be longer than 128 characters']
        },
        path : {
            type: String,
            required: [true,'Please provide image path'],
            unique: true,
            maxlength: [128,'Name can not be longer than 128 characters']
        },
        taggable:{
            type: Boolean,
            required: [true,'Please tell if this image is taggable or not'],
          
        }, 
        taggedTimes:{
            type: [Date]
        },   
        tags: {
            type:[Object]
        },
        tillComplete:{
            type:Number,
            required:[true,'Please tell how many times two or more taggers must agree till complete'],
        } 
       
       
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

export const ImageModel: Model<ImageDocument> =  model('Image', ImageSchema);