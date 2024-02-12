"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectControllerFactory = void 0;
const update_project_controller_1 = require("../../../application/controller/projects/update-project-controller");
const validators_1 = require("../../../validators");
const required_parameter_validator_1 = require("../../../validators/required-parameter-validator");
const project_repository_1 = require("../../../infra/repository/project-repository");
const updateProjectControllerFactory = () => {
    const validators = [
        new required_parameter_validator_1.RequiredParameterValidator('id')
    ];
    const validator = new validators_1.ValidatorComposite(validators);
    return new update_project_controller_1.UpdateProjectController(validator, new project_repository_1.ProjectRepository());
};
exports.updateProjectControllerFactory = updateProjectControllerFactory;
