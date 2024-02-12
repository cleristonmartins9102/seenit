"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserController = void 0;
const http_returns_1 = require("../../helpers/http-returns");
class DeleteUserController {
    constructor(validator, deleteUser) {
        this.validator = validator;
        this.deleteUser = deleteUser;
    }
    async handle(param) {
        const { body } = param;
        const error = this.validator.validate(body);
        if (error)
            return (0, http_returns_1.badRequest)(error);
        const deleteResponse = this.deleteUser.delete(body.id);
        return (0, http_returns_1.ok)(deleteResponse);
    }
}
exports.DeleteUserController = DeleteUserController;
