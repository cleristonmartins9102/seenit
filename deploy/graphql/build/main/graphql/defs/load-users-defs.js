"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadUserDef = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.loadUserDef = (0, apollo_server_express_1.gql) `
  type User {
    firstName: String
    surname: String
    email: String
    avatarUrl: String
    token: String
  }

  type Query {
    users: [User]
  }
`;
