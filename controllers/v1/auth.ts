import { userModel } from "../../models/user.js";
import type { RequestHandler } from "express";
import { checkRegister as registerValidator } from "./../../validators/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../utils/env.js";
import { banedUserModel } from "../../models/banedPhone.js";

export const register: RequestHandler = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult !== true) {
    return res.status(422).json({ errors: validationResult });
  }

  const { username, phone, email, password } = req.body;
  const userExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userExists) {
    return res
      .status(409)
      .json({ message: "username or email already exists." });
  }
  const isBanned = await banedUserModel.findOne({ phone });
  if (isBanned) {
    return res.status(409).json({ message: "Phone number is banned" });
  }
  const userCount = await userModel.countDocuments();
  const hashpassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    phone,
    password: hashpassword,
    role: userCount > 0 ? "user" : "admin",
  });
  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, hashpassword);

  const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "30 day",
  });

  return res.status(201).json({ user: userObject, accessToken });
};

export const login: RequestHandler = async (req, res) => {
  const { identifier, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (!user) {
    return res.status(401).json({ message: "Email or Username not found" });
  }

  if (typeof user.password !== "string") {
    return;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Password incorrect" });
  }

  const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: "30 day",
  });
  return res.status(201).json(accessToken);
};
export const getMe: RequestHandler = async (req, res) => {
  console.log(req.header("Authorization"));
};
