import  Express  from "express";
import { banUser } from "../../controllers/v1/user.js";

export const userRouter = Express.Router()

userRouter.route("/ban/:id").post(banUser)