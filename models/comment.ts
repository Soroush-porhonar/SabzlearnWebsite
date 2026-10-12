import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    body: { type: String, required: true, empty: false },
    creatorId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
    star: { type: Number, required: false, default: null },
    courseId: { type: mongoose.Types.ObjectId, ref: "course", required: true },
    isReply: { type: Boolean, default: false },
    RepliedComId: { type: mongoose.Types.ObjectId, ref: "comments" },
    Verified: { type: Boolean, default: false },
  },
  { timestamps: true },
);
schema.virtual("replies", {
  ref: "comments",
  localField: "_id",
  foreignField: "RepliedComId",
});

schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });
export const CommentsModel = mongoose.model("comments", schema);
