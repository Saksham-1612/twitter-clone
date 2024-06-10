import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
  tweets: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String },
    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
