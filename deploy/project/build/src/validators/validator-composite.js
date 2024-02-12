"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorComposite = void 0;
class ValidatorComposite {
    constructor(validators) {
        this.validators = validators;
    }
    validate(input) {
        for (const validator of this.validators) {
            const error = validator.validate(input);
            if (error) {
                return error;
            }
        }
        return null;
    }
}
exports.ValidatorComposite = ValidatorComposite;
