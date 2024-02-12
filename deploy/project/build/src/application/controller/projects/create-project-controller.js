"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProjectController = void 0;
const http_returns_1 = require("../../../application/helpers/http-returns");
class CreateProjectController {
    constructor(validator, createProject) {
        this.validator = validator;
        this.createProject = createProject;
    }
    async handle(input) {
        const { body, currentUser } = input;
        const error = this.validator.validate(body);
        if (error)
            return (0, http_returns_1.badRequest)(error);
        const project = this.createProject.create({ ...body, createdBy: { email: currentUser?.email, surname: currentUser?.surname, firstName: currentUser?.firstName } });
        return (0, http_returns_1.created)(project);
    }
}
exports.CreateProjectController = CreateProjectController;
