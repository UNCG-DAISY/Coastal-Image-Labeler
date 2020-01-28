import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/geocoder'
import { Entry } from 'node-geocoder'
import {ImageTag} from '../index'


//Schema extensions
//https://stackoverflow.com/questions/18317284/mongoose-extending-schemas

// interface developedTag extends Document {
//     tag: 'developed' | 'undeveloped'
// }

// function TagSchema(add:SchemaDefinition,modelName:string) {
//     let schema = new Schema({
//         tag:{
//             type:String,
//             required:true
//         },
//         tagger:{
//             type:String,
//             required:true
//         }
//     })

//     schema.add(add)
//     return schema;
// }

// const developedTagSchema:Schema = (TagSchema({
//         tag: {
//             type: String,
//             enum: ['developed', 'undeveloped']
//         }
//     }
//     ,
//     'DevelopedTag'
// ) as unknown as Schema)

// export const DevelopedTagModel: Model<developedTag> =  model('DevelopedTag', developedTagSchema);


const imageTagSchema: Schema = new Schema({
    taggerId:{
        required:[true,'TaggerId not passed'],
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