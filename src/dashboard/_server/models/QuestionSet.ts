/*
    Model for roles.
*/


import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import {QuestionSetDocument} from '../index'



const questionSetSchema: Schema = new Schema({
    name:{
        required:[true,'Name of question set not passed'],
        type:String
    },
    description:{
        required:[true,'Description of question set not passed'],
        type:String
    },
    questions:{
        required:[true,'Questions not passed'],
        type:[Object]
    }

},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})


export const QuestionSetModel: Model<QuestionSetDocument> =  model('QuestionSet', questionSetSchema);