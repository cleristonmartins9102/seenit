"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckEmailExistsValidator = void 0;
const errors_1 = require("../application/errors");
class CheckEmailExistsValidator {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    validate(input) {
        const users = this.userRepository.load();
        const user = users.filter(user => user.email === input.email);
        if (user.length)
            return new errors_1.EmailAlreadyExistsError(input.email);
        return null;
    }
}
exports.CheckEmailExistsValidator = CheckEmailExistsValidator;
