"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProjectController = void 0;
const http_returns_1 = require("../../helpers/http-returns");
class UpdateProjectController {
    constructor(validator, updateProject) {
        this.validator = validator;
        this.updateProject = updateProject;
    }
    async handle(param) {
        const { body } = param;
        const error = this.validator.validate(body);
        if (error)
            return (0, http_returns_1.badRequest)(error);
        const response = this.updateProject.update(body);
        return (0, http_returns_1.ok)(response);
    }
}
exports.UpdateProjectController = UpdateProjectController;
