"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicatedProjectError = void 0;
class DuplicatedProjectError extends Error {
    constructor(name) {
        super(`Project with name ${name} already exists`);
        this.name = 'DuplicatedProjectError';
    }
}
exports.DuplicatedProjectError = DuplicatedProjectError;
