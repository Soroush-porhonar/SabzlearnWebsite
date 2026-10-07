import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      empty: false,
      require: true,
    },
    free: { type: Boolean, require: true },
    course: { type: mongoose.Types.ObjectId, ref: "course", require: true },

    video: { type: String, require: true },
    time: { type: String, require: true },
  },
  { timestamps: true },
);
export const sessionModel = mongoose.model("session", schema);
