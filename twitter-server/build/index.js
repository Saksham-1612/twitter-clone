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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const db_1 = __importDefault(require("./db/db"));
const user_1 = require("./app/user");
const UserService_1 = __importDefault(require("./services/UserService"));
const tweet_1 = require("./app/tweet");
(0, db_1.default)();
const url = "http://localhost:4000/";
const server = new server_1.ApolloServer({
    typeDefs: `
    ${user_1.UserGql.types}
    ${tweet_1.TweetGql.types}

    type Query {
      ${user_1.UserGql.queries}
      ${tweet_1.TweetGql.queries}
    }
    type Mutation {
      ${user_1.UserGql.mutations}
      ${tweet_1.TweetGql.mutations}
    }
  `,
    resolvers: Object.assign(Object.assign({ Query: Object.assign(Object.assign({}, user_1.UserGql.resolvers.queries), tweet_1.TweetGql.resolvers.queries), Mutation: Object.assign(Object.assign({}, user_1.UserGql.resolvers.mutations), tweet_1.TweetGql.resolvers.mutations) }, tweet_1.TweetGql.resolvers.extraResolvers), user_1.UserGql.resolvers.extraResolvers),
    introspection: true,
});
(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 },
    context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
        const token = req.headers.authorization || "";
        let user;
        if (token) {
            user = yield UserService_1.default.getUserFromToken(token);
        }
        return { user: user ? user : {} };
    }),
});
console.log(`🚀  Server ready at: ${url}`);
