"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadProjectController = void 0;
const http_returns_1 = require("../../helpers/http-returns");
class LoadProjectController {
    constructor(loadProject) {
        this.loadProject = loadProject;
    }
    async handle(param) {
        const projects = this.loadProject.load();
        return (0, http_returns_1.ok)(projects);
    }
}
exports.LoadProjectController = LoadProjectController;
