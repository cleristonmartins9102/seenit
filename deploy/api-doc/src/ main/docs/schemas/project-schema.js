"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
exports.projectSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'number'
        },
        name: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        createdBy: {
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
