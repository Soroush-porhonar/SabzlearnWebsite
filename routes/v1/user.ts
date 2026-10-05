import Express from "express";
import { getAll, banUser, removeUser } from "../../controllers/v1/user.js";
import { isAdmin } from "../../middleware/adminVerification.js";
import { isToken } from "../../middleware/auth.js";
import { isIdValid } from "../../middleware/idValidation.js";
export const userRouter = Express.Router();

userRouter.route("/ban/:id").post(isToken, isAdmin, isIdValid, banUser);
userRouter.route("/").get(isToken, isAdmin, getAll);
userRouter.route("/:id").delete(isToken, isAdmin, isIdValid, removeUser);
