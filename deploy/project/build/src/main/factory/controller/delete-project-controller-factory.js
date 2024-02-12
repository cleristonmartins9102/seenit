"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectControllerFactory = void 0;
const project_repository_1 = require("../../../infra/repository/project-repository");
const delete_project_controller_1 = require("../../../application/controller/projects/delete-project-controller");
const validators_1 = require("../../../validators");
const required_parameter_validator_1 = require("../../../validators/required-parameter-validator");
const deleteProjectControllerFactory = () => {
    const validators = [
        new required_parameter_validator_1.RequiredParameterValidator('id')
    ];
    const validator = new validators_1.ValidatorComposite(validators);
    return new delete_project_controller_1.DeleteProjectController(validator, new project_repository_1.ProjectRepository());
};
exports.deleteProjectControllerFactory = deleteProjectControllerFactory;
