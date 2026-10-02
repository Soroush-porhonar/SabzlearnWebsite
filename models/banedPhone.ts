import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    
    phone: { type: Number, require: true },
    
  },
  { timestamps: true },
);
export const banedPhoneModel = mongoose.model("banedphone", schema);
