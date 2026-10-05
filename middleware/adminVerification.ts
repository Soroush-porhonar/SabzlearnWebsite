import { RequestHandler } from "express";
import { userModel } from "../models/user.js";

export const isAdmin: RequestHandler = async (req, res, next) => {
  const user = res.locals.user;
  console.log(user, "admin");
  if (user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Only allowed by Admin" });
  }
};
