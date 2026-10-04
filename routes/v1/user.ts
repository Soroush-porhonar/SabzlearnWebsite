import Express from "express";
import { banUser } from "../../controllers/v1/user.js";
import { isAdmin } from "../../middleware/adminVerification.js";
import { isToken } from "../../middleware/auth.js";

export const userRouter = Express.Router();

userRouter.route("/ban/:id").post(isToken, isAdmin, banUser);
