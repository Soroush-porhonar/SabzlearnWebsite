import { RequestHandler } from "express";
import mongoose from "mongoose";

export const isIdValid: RequestHandler = (req, res, next) => {
  const ids: Record<string, mongoose.Types.ObjectId> = {};

  for (const [key, value] of Object.entries(req.params)) {
    if (typeof value !== "string" || !mongoose.isObjectIdOrHexString(value)) {
      res.status(400).json({
        message: `${key} is not a valid ID`,
      });
      return;
    }

    ids[key] = new mongoose.Types.ObjectId(value);
  }

  res.locals.ids = ids;
  next();
};
