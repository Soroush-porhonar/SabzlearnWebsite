import Express from "express";
import {
  getAll,
  banUser,
  removeUser,
  changeRole,
  updateInfo,
} from "../../controllers/v1/user.js";
import { isAdmin } from "../../middleware/adminVerification.js";
import { isToken } from "../../middleware/auth.js";
import { isIdValid } from "../../middleware/idValidation.js";
export const userRouter = Express.Router();

userRouter.route("/ban/:userId").post(isToken, isAdmin, isIdValid, banUser);
userRouter.route("/").get(isToken, isAdmin, getAll);
userRouter.route("/:userId").delete(isToken, isAdmin, isIdValid, removeUser);
userRouter.route("/role/:userId").put(isToken, isAdmin, isIdValid, changeRole);
userRouter.route("/update").put(isToken, updateInfo);
