"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProjectController = void 0;
const http_returns_1 = require("../../helpers/http-returns");
class DeleteProjectController {
    constructor(validator, deleteProject) {
        this.validator = validator;
        this.deleteProject = deleteProject;
    }
    async handle(param) {
        const { body } = param;
        const error = this.validator.validate(body);
        if (error)
            return (0, http_returns_1.badRequest)(error);
        const deleteResponse = this.deleteProject.delete(body.id);
        return (0, http_returns_1.ok)(deleteResponse);
    }
}
exports.DeleteProjectController = DeleteProjectController;
