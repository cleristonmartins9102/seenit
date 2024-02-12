"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRouters = void 0;
const express_1 = require("express");
const create_project_router_1 = require("../../main/routers/project/create-project-router");
const load_projects_router_1 = require("../../main/routers/project/load-projects-router");
const update_project_router_1 = require("../../main/routers/project/update-project-router");
const delete_project_router_1 = require("../../main/routers/project/delete-project-router");
const setupRouters = (app) => {
    const router = (0, express_1.Router)();
    app.use('/api', router);
    (0, create_project_router_1.createProjectRouter)(router);
    (0, load_projects_router_1.loadProjectRouter)(router);
    (0, update_project_router_1.updateProjectRouter)(router);
    (0, delete_project_router_1.deleteProjectRouter)(router);
};
exports.setupRouters = setupRouters;
