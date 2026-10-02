import Express from "express";
import { register, login, getMe } from "../../controllers/v1/auth.js";

export const authRouter = Express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/me", getMe);
