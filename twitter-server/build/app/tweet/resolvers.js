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
exports.resolvers = void 0;
const TweetModel_1 = require("../../Model/TweetModel");
const UserModel_1 = require("../../Model/UserModel");
const queries = {
    getAllTweets: () => __awaiter(void 0, void 0, void 0, function* () { return yield TweetModel_1.Tweet.find({}).sort({ createdAt: -1 }); }),
};
const mutations = {
    createTweet: (_1, _a, context_1) => __awaiter(void 0, [_1, _a, context_1], void 0, function* (_, { content, imageUrl }, context) {
        if (!context.user || !context.user._id) {
            throw new Error("Unauthorized access");
        }
        const tweet = yield TweetModel_1.Tweet.create({
            content,
            imageURL: imageUrl,
            author: context.user._id,
        });
        // console.log(tweet);
        return tweet;
    }),
};
const extraResolvers = {
    Tweet: {
        author: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield UserModel_1.User.findById(parent.author); }),
    },
};
exports.resolvers = {
    queries,
    mutations,
    extraResolvers,
};
