import { userModel } from "../../models/user.js";
import { banedUserModel } from "../../models/banedPhone.js";
import { RequestHandler } from "express";

export const banUser: RequestHandler = async (req, res) => {
  const user = await userModel.findById(req.params.id);
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
