import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    body: { type: String, require: true, empty: false },
    creator: { type: mongoose.Types.ObjectId, ref: "users", require: true },
    star: { type: Number, require: true },
    isReply: { type: Boolean, require: true },
    RepliedCom: { type: mongoose.Types.ObjectId, ref: "comments" },
    Verified: { type: Boolean, require: true, default: 0 },
  },
  { timestamps: true },
);
export const CommentsModel = mongoose.model("comments", schema);
