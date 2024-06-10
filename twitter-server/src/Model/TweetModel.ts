import mongoose, { Schema, model, Document, Types } from "mongoose";
import { IUser } from "./UserModel";

interface ITweet extends Document {
  _id: Types.ObjectId;
  content: string;
  imageURL?: string;
  author: Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const tweetSchema = new Schema<ITweet>(
  {
    content: { type: String, required: true },
    imageURL: { type: String },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Tweet = model<ITweet>("Tweet", tweetSchema);

export { Tweet, ITweet };
