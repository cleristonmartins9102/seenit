"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const defs_1 = require("./main/graphql/defs");
const resolvers_1 = require("./main/graphql/resolvers");
const handleErrors = (response, errors) => {
    if (typeof errors !== 'undefined') {
        errors.forEach((error) => {
            if (checkError(error, 'UnauthorizedError')) {
                response.http.status = 401;
                response.data = undefined;
            }
            else if (checkError(error, 'BadRequestError')) {
                response.http.status = 400;
                response.data = undefined;
            }
        });
    }
};
const checkError = (error, errorName) => { var _a; return [error.name, (_a = error === null || error === void 0 ? void 0 : error.originalError) === null || _a === void 0 ? void 0 : _a.name].some(name => name === errorName); };
const server = new apollo_server_1.ApolloServer({
    typeDefs: defs_1.typeDefs,
    resolvers: resolvers_1.resolvers,
    context: ({ req }) => ({ req }),
    plugins: [
        {
            requestDidStart: () => ({
                willSendResponse: ({ response, errors }) => { handleErrors(response, errors); }
            })
        }
    ]
});
// The `listen` method launches a web server.
void server.listen(5051, () => { console.log('Running on por 5051'); });
