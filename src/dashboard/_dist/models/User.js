"use strict";
/*
    Model for users. Contains a link to each role the user has and what storms they can tag
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
// import slugify from 'slugify'
// import {geocoder} from '../utils/v1/geocoder'
// import { Entry } from 'node-geocoder'
// import { number } from 'prop-types'
// import {RoleModel} from './Role'
const userSchema = new mongoose_1.Schema({
    assignedImages: {
        type: Object
    },
    catalogs: {
        type: [mongoose_1.Types.ObjectId]
    },
    dateAdded: {
        type: Date
    },
    userId: {
        required: [true, 'UserId not passed'],
        unique: true,
        type: String
    },
    userMessage: {
        required: false,
        type: String
    },
    userName: {
        required: [true, 'Username not passed'],
        unique: true,
        type: String
    },
    imagesTagged: {
        type: [String],
        default: []
    },
    roles: {
        type: [String],
        default: []
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
//before saving
// Add date created
userSchema.pre('save', async function (next) {
    //if there is no dateAdded, add one
    if (!this.dateAdded) {
        this.dateAdded = Date.now();
    }
    next();
});
// Reverse populate with virtuals
// userSchema.virtual('roleData', {
//     ref: 'Role',
//     localField: 'roles',
//     foreignField: '_id',
//     justOne: false
// })
// //This runs everytime
// userSchema
// .virtual('roleNames')
// .get(function () {
//     let roleNames:string[] = []
//     if(this.roleData) {
//         for(let i =0;i<this.roleData.length;i++) {
//             let role = this.roleData[i]
//             roleNames.push(role.name)
//         }
//     }
//     return roleNames
// });
exports.UserModel = mongoose_1.model('User', userSchema);
