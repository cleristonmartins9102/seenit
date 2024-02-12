"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const projects_resolvers_1 = require("./projects-resolvers");
const user_resolvers_1 = require("./user-resolvers");
exports.resolvers = [user_resolvers_1.usersResolver, projects_resolvers_1.projectsResolver];
