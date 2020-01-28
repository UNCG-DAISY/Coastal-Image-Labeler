import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/geocoder'
import { Entry } from 'node-geocoder'

//Schema extensions
//https://stackoverflow.com/questions/18317284/mongoose-extending-schemas

interface developedTag extends Document {
    tag: 'developed' | 'undeveloped'
}

function TagSchema(add:SchemaDefinition,modelName:string) {
    let schema = new Schema({
        tag:{
            type:String,
            required:true
        },
        tagger:{
            type:String,
            required:true
        }
    })

    schema.add(add)
    return schema;
}

const developedTagSchema:Schema = (TagSchema({
        tag: {
            type: String,
            enum: ['developed', 'undeveloped']
        }
    }
    ,
    'DevelopedTag'
) as unknown as Schema)

export const DevelopedTagModel: Model<developedTag> =  model('DevelopedTag', developedTagSchema);

