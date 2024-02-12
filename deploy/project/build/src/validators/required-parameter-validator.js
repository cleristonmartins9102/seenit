"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredParameterValidator = void 0;
const errors_1 = require("../../src/application/errors");
class RequiredParameterValidator {
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        if (!input || input[this.fieldName] === undefined)
            return new errors_1.RequiredParameterError(this.fieldName);
        return null;
    }
}
exports.RequiredParameterValidator = RequiredParameterValidator;
