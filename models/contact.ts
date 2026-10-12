import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true, empty: false },
    email: { type: String, required: true, empty: false },
    phone: { type: String, required: true, empty: false },
    body: { type: String, required: true, empty: false },
    answered: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const contactModel = mongoose.model("contact", schema);
