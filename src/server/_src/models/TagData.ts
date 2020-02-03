import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/v1/geocoder'
import { Entry } from 'node-geocoder'
import {TagDataDocument} from '../index'

const tagDataSchema: Schema = new Schema({
    imageId:{
        required:[true,'Id of image being tag not passed'],
        type:String
    },
    tag:{
        developmentType :{
            required:[true,'No development type passed'],
            type:String,
            enum:['developed','undeveloped']
        },
        washoverType:{
            required:[true,'No washover type passed'],
            type:String,
            enum:['washover','nowashover']
        },
        impactType:{
            required:[true,'No impact type passed'],
            type:String,
            enum:['n/a','swash','collision','overwash','inundation']
        },
        terrianType:{
            required:[true,'No terrian type passed'],
            type:[String],
            enum:['river','marsh','sandyCoastline']
        }
    },
    taggerId:{
        required:[true,'TaggerId not passed'],
        type:String
    },
    timeOfTag:{
        type:Date,
        required:[true,'No time of tag passed']
    },
})

export const TagDataModel: Model<TagDataDocument> =  model('TagData', tagDataSchema);