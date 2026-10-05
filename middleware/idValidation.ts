import { RequestHandler } from "express";
import mongoose from "mongoose";

export const isIdValid: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const result = mongoose.isValidObjectId(id);
  if (result) {
    next();
  } else {
    res.status(409).json({ message: "Id is not valid" });
  }
};
