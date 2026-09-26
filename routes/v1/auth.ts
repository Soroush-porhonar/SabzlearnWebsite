import Express from "express";
import { register, login, getMe } from "../../controllers/v1/auth.js";

export const Router = Express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.get("/me", getMe);
