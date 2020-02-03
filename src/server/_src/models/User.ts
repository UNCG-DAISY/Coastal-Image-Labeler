import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/geocoder'
import { Entry } from 'node-geocoder'
import {ImageTag} from '../index'


const userSchema: Schema = new Schema({
    userId:{
        required:[true,'UserId not passed'],
        type:String
    },
    tag:{
        //required:[true,'Must pass tag data'],
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
    timeOfTag:{
        type:Date,
        required:[true,'No time of tag passed']
    }
})



export const ImageTagModel: Model<ImageTag> =  model('ImageTag', imageTagSchema);