"use strict";
/*
    Model for roles.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const mongoose_1 = require("mongoose");
const roleSchema = new mongoose_1.Schema({
    name: {
        required: [true, 'Role name not passed'],
        unique: true,
        type: String
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Reverse populate with virtuals
roleSchema.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'roles',
    justOne: false
});
exports.RoleModel = mongoose_1.model('Role', roleSchema);
