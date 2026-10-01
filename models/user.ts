import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    phone: { type: Number, require: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      require: true,
    },
  },
  { timestamps: true },
);
export const userModel = mongoose.model("users", schema);
