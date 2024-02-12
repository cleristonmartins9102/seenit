"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadUsersController = void 0;
const http_returns_1 = require("../../helpers/http-returns");
class LoadUsersController {
    constructor(loadUsers) {
        this.loadUsers = loadUsers;
    }
    async handle(param) {
        const users = this.loadUsers.load();
        return (0, http_returns_1.ok)(users);
    }
}
exports.LoadUsersController = LoadUsersController;
