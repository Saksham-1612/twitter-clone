"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGql = void 0;
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const resolvers_1 = require("./resolvers");
const types_1 = require("./types");
exports.UserGql = { types: types_1.types, resolvers: resolvers_1.resolvers, queries: queries_1.queries, mutations: mutations_1.mutations };
