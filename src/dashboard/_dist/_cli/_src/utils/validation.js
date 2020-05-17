"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRequired = void 0;
const isRequired = input => (input === '' ? 'This value is required' : true);
exports.isRequired = isRequired;
