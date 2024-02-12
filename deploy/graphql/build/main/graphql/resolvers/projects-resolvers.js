"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectsResolver = void 0;
const resolver_adapter_1 = require("../../../infra/adapter/resolver-adapter");
exports.projectsResolver = {
    Query: {
        projects: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, resolver_adapter_1.resolverAdapter)(context.req, 'http://127.0.0.1:3000/api/project/load'); })
    }
};
