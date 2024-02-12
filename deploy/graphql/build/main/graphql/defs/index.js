"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const load_projects_defs_1 = require("./load-projects-defs");
const load_users_defs_1 = require("./load-users-defs");
exports.typeDefs = [load_users_defs_1.loadUserDef, load_projects_defs_1.loadProjectsDef];
