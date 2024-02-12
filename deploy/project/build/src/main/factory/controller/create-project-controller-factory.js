"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProjectControllerFactory = void 0;
const project_repository_1 = require("../../../infra/repository/project-repository");
const controller_1 = require("../../../application/controller");
const validators_1 = require("../../../validators");
const required_parameter_validator_1 = require("../../../validators/required-parameter-validator");
const check_if_project_already_exists_validator_1 = require("../../../validators/check-if-project-already-exists-validator");
const createProjectControllerFactory = () => {
    const validators = [
        new required_parameter_validator_1.RequiredParameterValidator('name'),
        new required_parameter_validator_1.RequiredParameterValidator('description'),
        new check_if_project_already_exists_validator_1.CheckIfProjectExistsValidator(new project_repository_1.ProjectRepository())
    ];
    const validator = new validators_1.ValidatorComposite(validators);
    return new controller_1.CreateProjectController(validator, new project_repository_1.ProjectRepository());
};
exports.createProjectControllerFactory = createProjectControllerFactory;
