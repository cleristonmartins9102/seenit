"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserControllerFactory = void 0;
const controller_1 = require("../../../application/controller");
const user_repository_1 = require("../../../infra/repository/user-repository");
const validators_1 = require("../../../validators");
const required_parameter_validator_1 = require("../../../validators/required-parameter-validator");
const updateUserControllerFactory = () => {
    const validators = [
        new required_parameter_validator_1.RequiredParameterValidator('id')
    ];
    const validator = new validators_1.ValidatorComposite(validators);
    return new controller_1.UpdateUserController(validator, new user_repository_1.UserRepository());
};
exports.updateUserControllerFactory = updateUserControllerFactory;
