"use strict";
/*
    Model for roles.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionSetModel = void 0;
const mongoose_1 = require("mongoose");
const questionSetSchema = new mongoose_1.Schema({
    name: {
        required: [true, 'Name of question set not passed'],
        type: String
    },
    description: {
        required: [true, 'Description of question set not passed'],
        type: String
    },
    questions: {
        required: [true, 'Questions not passed'],
        type: [Object]
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
exports.QuestionSetModel = mongoose_1.model('QuestionSet', questionSetSchema);
