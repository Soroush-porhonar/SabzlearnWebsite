import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    href: { type: String, require: true },
  },
  { timestamps: true },
);

export const categoryModel = mongoose.model("categories", schema);
