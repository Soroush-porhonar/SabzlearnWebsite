import { userModel } from "../../models/user.js";
import { banedUserModel } from "../../models/banedPhone.js";
import { RequestHandler } from "express";
import bcrypt from "bcrypt";

export const banUser: RequestHandler = async (req, res) => {
  const userId = res.locals.ids.userId;
  const user = await userModel.findById(userId);
  const banExist = await banedUserModel.findOne({ phone: user?.phone });
  if (banExist) {
    return res.status(204).json({ message: "User was banned" });
  }
  const banedUserResult = await banedUserModel.create({ phone: user?.phone });
  if (banedUserResult) {
    return res.status(200).json({ message: "User baned successfully" });
  }

  return res.status(500).json({ message: "Server Errors" });
};
export const getAll: RequestHandler = async (req, res) => {
  const allUsers = await userModel.find().select("-password").lean();
  res.json(allUsers);
};
export const removeUser: RequestHandler = async (req, res) => {
  const userId = res.locals.ids.userId;
  const removeResult = await userModel.findByIdAndDelete(userId);
  if (removeResult) {
    res.status(404).json({ message: "id wasnt found" });
  } else {
    res.status(200).json({ message: "user removed successfully" });
  }
};
export const changeRole: RequestHandler = async (req, res) => {
  const userId = res.locals.ids.userId;
  const user = await userModel.findById(userId);
  const newRole = user?.role === "user" ? "admin" : "user";
  const result = await userModel.findByIdAndUpdate(userId, { role: newRole });
  if (result) {
    res.status(200).json({ message: "user promoted to admin successfully" });
  } else {
    res.status(409).json({ message: "User not found" });
  }
};
export const updateInfo: RequestHandler = async (req, res) => {
  const user = res.locals.user;
  const { username, phone, password, email } = req.body;
  const hashPassword = bcrypt.hash(password, 10);
  const updateResult = await userModel
    .findByIdAndUpdate(user.id, {
      username,
      phone,
      password: hashPassword,
      email,
    })
    .select("-password");
  if (updateResult) {
    res
      .status(200)
      .json({ message: "User info updated Successfully", updateResult });
  }
};
