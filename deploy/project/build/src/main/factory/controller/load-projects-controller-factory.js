"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProjectsControllerFactory = void 0;
const load_project_controller_1 = require("../../../application/controller/projects/load-project-controller");
const project_repository_1 = require("../../../infra/repository/project-repository");
const loadProjectsControllerFactory = () => {
    return new load_project_controller_1.LoadProjectController(new project_repository_1.ProjectRepository());
};
exports.loadProjectsControllerFactory = loadProjectsControllerFactory;
