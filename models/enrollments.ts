import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true },
);
export const enrollmentModel = mongoose.model("enrollments", schema);
