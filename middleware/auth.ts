import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";
import { RequestHandler } from "express";
import { JWT_SECRET } from "../utils/env.js";

export const isToken: RequestHandler = async (req, res, next) => {
  const authHeader = req.header("Authorization")?.split(" ");
  if (authHeader?.length !== 2) {
    return res
      .status(403)
      .json({ message: "You dont have access to this API" });
  }

  const token = authHeader[1];
  try {
    const jwtPayload = jwt.verify(token, JWT_SECRET);
    if (typeof jwtPayload === "string") {
      return res.status(401).json({ message: "Invalid token" });
    }
    const user = await userModel
      .findById(jwtPayload.id)
      .select("-password")
      .lean();

    res.locals.user = user;

    next();
  } catch (error) {
    return res.json(error);
  }
};
