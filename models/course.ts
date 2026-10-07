import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    support: { type: String },
    href: { type: String, require: true },
    cover: { type: String, require: true },
    stars: { type: Number },
    price: { type: Number, require: true },
    discount: { type: Number, default: 0 },
    categoryId: { type: String, require: true },
    creator: { type: mongoose.Types.ObjectId, require: true },
    status: { type: String, require: true },
    sessions: { type: mongoose.Types.ObjectId, ref: "sessions", require: true },
  },
  { timestamps: true },
);
schema.virtual("session", {
  ref: "sessions",
  localField: "_id",
  foreignField: "course",
});
schema.virtual("comment", {
  ref: "comments",
  localField: "_id",
  foreignField: "course",
});
export const courseModel = mongoose.model("courses", schema);
