import mongoose, { Schema } from "mongoose";
import userModel from "./User.js";
const otpSchema = new mongoose.Schema(
  {
    email: {
      type: "string",
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const otpModel = mongoose.model("otp", otpSchema);

export default otpModel;
