import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    body: { type: String, required: true, empty: false },
    creatorId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    star: { type: Number, required: true },
    courseId: { type: mongoose.Types.ObjectId, ref: "course", required: true },
    isReply: { type: Boolean, default: false },
    RepliedComId: { type: mongoose.Types.ObjectId, ref: "comments" },
    Verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export const CommentsModel = mongoose.model("comments", schema);
