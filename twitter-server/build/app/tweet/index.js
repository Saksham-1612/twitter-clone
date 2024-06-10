"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetGql = void 0;
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const resolvers_1 = require("./resolvers");
const type_1 = require("./type");
exports.TweetGql = { types: type_1.types, resolvers: resolvers_1.resolvers, mutations: mutations_1.mutations, queries: queries_1.queries };
