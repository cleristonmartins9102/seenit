"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupControllerFactory = void 0;
const validator_email_adapter_1 = require("../../../infra/adapters/validator-email-adapter");
const controller_1 = require("../../../application/controller");
const user_repository_1 = require("../../../infra/repository/user-repository");
const validators_1 = require("../../../validators");
const required_parameter_validator_1 = require("../../../validators/required-parameter-validator");
const crypto_adapter_1 = require("../../../infra/adapters/crypto-adapter");
const jwt_adapter_1 = require("../../../infra/adapters/jwt-adapter");
const file_storage_adapter_1 = require("../../../infra/adapters/file-storage-adapter");
const signupControllerFactory = () => {
    const validators = [
        new required_parameter_validator_1.RequiredParameterValidator('firstName'),
        new required_parameter_validator_1.RequiredParameterValidator('surname'),
        new required_parameter_validator_1.RequiredParameterValidator('email'),
        new required_parameter_validator_1.RequiredParameterValidator('password'),
        new required_parameter_validator_1.RequiredParameterValidator('avatar'),
        new validator_email_adapter_1.EmailValidatorAdapter(),
        new validators_1.CheckEmailExistsValidator(new user_repository_1.UserRepository())
    ];
    const validator = new validators_1.ValidatorComposite(validators);
    return new controller_1.SignupController(validator, new user_repository_1.UserRepository(), new crypto_adapter_1.CryptoAdapter(), new jwt_adapter_1.JwtAdapter(), new file_storage_adapter_1.FileStorageAdapter());
};
exports.signupControllerFactory = signupControllerFactory;
