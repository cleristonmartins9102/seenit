"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
exports.userSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number'
        },
        firstName: {
            type: 'string'
        },
        surname: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        avatarUrl: {
            type: 'string'
        },
        createdAt: {
            type: 'string'
        },
        updatedAt: {
            type: 'string'
        }
    }
};
