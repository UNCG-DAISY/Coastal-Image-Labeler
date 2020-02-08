import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import slugify from 'slugify'
import {geocoder} from '../utils/v1/geocoder'
import { Entry } from 'node-geocoder'
import {UserDocument} from '../index'
import { number } from 'prop-types'
import {RoleModel} from './Role'


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
    role:{
        type:[Types.ObjectId],
        default:[]
    }
    // storm: {
    //     type: [Types.ObjectId],
    //     ref: 'Storm',
    //     default: []
    // }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//before saving
// Add date created
userSchema.pre<UserDocument>('save', async function(next:HookNextFunction) {
    this.dateAdded = Date.now()
    next();
});

// Reverse populate with virtuals
userSchema.virtual('roleName', {
    ref: 'Role',
    localField: 'role',
    foreignField: '_id',
    justOne: false
});


export const UserModel: Model<UserDocument> =  model('User', userSchema);