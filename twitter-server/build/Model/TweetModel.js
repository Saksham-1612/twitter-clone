"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const mongoose_1 = require("mongoose");
const tweetSchema = new mongoose_1.Schema({
    content: { type: String, required: true },
    imageURL: { type: String },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});
const Tweet = (0, mongoose_1.model)("Tweet", tweetSchema);
exports.Tweet = Tweet;
