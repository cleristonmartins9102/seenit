"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProjectsDef = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.loadProjectsDef = (0, apollo_server_express_1.gql) `
  type Project {
    name: String
    description: String
    createdAt: String
    createdBy: String
  }

  type Query {
    projects: [Project]
  }
`;
