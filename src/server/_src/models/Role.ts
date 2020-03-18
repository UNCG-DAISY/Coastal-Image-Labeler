/*
    Model for roles.
*/


import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import {RoleDocument} from '../index'



const roleSchema: Schema = new Schema({
    
  
    name:{
        required:[true,'Role name not passed'],
        unique: true,
        type:String
    }
  
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Reverse populate with virtuals
roleSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'roles',
    justOne: false
});

export const RoleModel: Model<RoleDocument> =  model('Role', roleSchema);