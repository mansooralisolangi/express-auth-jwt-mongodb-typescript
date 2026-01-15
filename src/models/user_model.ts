
import mongoose from "mongoose";
import { UserTypes } from "../@types/user-types";

const userSchema = new mongoose.Schema<UserTypes>(
  {
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone_number:{type: String,}

  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model<UserTypes>("User", userSchema);