import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    body: { type: String, require: true, empty: false },
    creator: { type: mongoose.Types.ObjectId, ref: "users", require: true },
    star: { type: Number, require: true },
    courseId: { type: mongoose.Types.ObjectId, ref: "course", required: true },
    isReply: { type: Boolean, default: false },
    RepliedCom: { type: mongoose.Types.ObjectId, ref: "comments" },
    Verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export const CommentsModel = mongoose.model("comments", schema);
