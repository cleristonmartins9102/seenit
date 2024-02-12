"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRouters = void 0;
const express_1 = require("express");
const user_1 = require("../routers/user");
const delete_user_router_1 = require("../../main/routers/user/delete-user-router");
const setupRouters = (app) => {
    const router = (0, express_1.Router)();
    app.use('/api', router);
    (0, user_1.signupRouter)(router);
    (0, user_1.updateUserRouter)(router);
    (0, user_1.loadUsersRouter)(router);
    (0, delete_user_router_1.deleteUserRouter)(router);
};
exports.setupRouters = setupRouters;
