"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIfProjectExistsValidator = void 0;
const errors_1 = require("../application/errors");
class CheckIfProjectExistsValidator {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    validate(input) {
        const projects = this.projectRepository.load();
        const project = projects.filter(project => project.name === input.name);
        if (project.length)
            return new errors_1.DuplicatedProjectError(input.name);
        return null;
    }
}
exports.CheckIfProjectExistsValidator = CheckIfProjectExistsValidator;
