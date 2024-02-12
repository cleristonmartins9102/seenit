"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserControllerFactory = void 0;
const controller_1 = require("../../../application/controller");
const user_repository_1 = require("../../../infra/repository/user-repository");
const loadUserControllerFactory = () => {
    return new controller_1.LoadUsersController(new user_repository_1.UserRepository());
};
exports.loadUserControllerFactory = loadUserControllerFactory;
