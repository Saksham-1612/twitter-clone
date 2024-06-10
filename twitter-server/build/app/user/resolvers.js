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
exports.resolvers = void 0;
const TweetModel_1 = require("../../Model/TweetModel");
const UserService_1 = __importDefault(require("../../services/UserService"));
// Define the queries
const queries = {
    loginUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
        const res = yield UserService_1.default.loginUser({
            email,
            password,
        });
        return {
            status: res.status,
            token: res === null || res === void 0 ? void 0 : res.token,
        };
    }),
    getCurrentUser: (_, params, context) => __awaiter(void 0, void 0, void 0, function* () {
        return context.user;
    }),
};
// Define the mutations
const mutations = {
    signUp: (_2, _b) => __awaiter(void 0, [_2, _b], void 0, function* (_, { firstName, lastName, email, password }) {
        const res = yield UserService_1.default.createUser({
            firstName,
            lastName,
            email,
            password,
        });
        return {
            status: res.status,
            id: (res === null || res === void 0 ? void 0 : res.user) ? res.user._id.toString() : null,
        };
    }),
};
// Define extra resolvers for the User type
const extraResolvers = {
    User: {
        tweets: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield TweetModel_1.Tweet.find({ author: parent._id }); }),
    },
};
// Combine resolvers
exports.resolvers = {
    queries,
    mutations,
    extraResolvers,
};
