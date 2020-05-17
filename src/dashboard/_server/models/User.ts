/*
    Model for users. Contains a link to each role the user has and what storms they can tag
*/


import { Schema, model, Model, Document, HookNextFunction, SchemaDefinition, Types} from 'mongoose'
import {UserDocument} from '../index'
// import slugify from 'slugify'
// import {geocoder} from '../utils/v1/geocoder'
// import { Entry } from 'node-geocoder'
// import { number } from 'prop-types'
// import {RoleModel} from './Role'


const userSchema: Schema = new Schema({
    assignedImages:{
        type:Object
    },
    storms:{
        type:[Types.ObjectId]
    },
    dateAdded:{
        type:Date
    },
    userId:{
        required:[true,'UserId not passed'],
        unique: true,
        type:String
    },
    userMessage:{
        required:false,
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
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

//before saving
// Add date created
userSchema.pre<UserDocument>('save', async function(next:HookNextFunction) {
    //if there is no dateAdded, add one
    if(!this.dateAdded) {
        this.dateAdded = Date.now()
    }
    
    next();
});

// Reverse populate with virtuals
userSchema.virtual('roleData', {
    ref: 'Role',
    localField: 'role',
    foreignField: '_id',
    justOne: false
})

//This runs everytime
userSchema
.virtual('roleNames')
.get(function () {
    let roleNames:string[] = []
    if(this.roleData) {
        for(let i =0;i<this.roleData.length;i++) {
            let role = this.roleData[i]
            roleNames.push(role.name)
        }
    }
    

    return roleNames
});


export const UserModel: Model<UserDocument> =  model('User', userSchema);