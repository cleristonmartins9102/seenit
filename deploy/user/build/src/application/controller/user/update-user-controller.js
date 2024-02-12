"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const http_returns_1 = require("../../helpers/http-returns");
class UpdateUserController {
    constructor(validator, updateUser) {
        this.validator = validator;
        this.updateUser = updateUser;
    }
    async handle(param) {
        const { body } = param;
        const error = this.validator.validate(body);
        if (error)
            return (0, http_returns_1.badRequest)(error);
        const response = this.updateUser.update(body);
        return (0, http_returns_1.ok)(response);
    }
}
exports.UpdateUserController = UpdateUserController;
