import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/v1/geocoder'
import { Entry } from 'node-geocoder'
import {UserDocument} from '../index'
import { number } from 'prop-types'


const userSchema: Schema = new Schema({
    
    dateAdded:{
        type:Date
    },
    userId:{
        required:[true,'UserId not passed'],
        unique: true,
        type:String
    },
    userName: {
        required:[true,'Username not passed'],
        unique: true,
        type:String
    },
    imagesTagged: {
        type: [String],
        default: []
    },
    numberOfImagesTagged: {
        type: Number,
        default: 0
    },
    roles:{
        type:[String],
        enum: ['defaultRole', 'taggerRole'],
        default:'defaultRole'
    },
    storm: {
        type: [Types.ObjectId],
        ref: 'Storm',
        default: []
    }
})

//before saving
// Create bootcamp slug from the name
userSchema.pre<UserDocument>('save', function(next:HookNextFunction) {
    this.dateAdded = Date.now()

    next();
});


export const UserModel: Model<UserDocument> =  model('User', userSchema);