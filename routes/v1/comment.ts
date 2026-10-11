import { Router } from "express";
import { createComment } from "../../controllers/v1/comments.js";
import { isIdValid } from "../../middleware/idValidation.js";
import { isToken } from "../../middleware/auth.js";

export const commentRouter = Router();

commentRouter.route("/:id").post(isToken, isIdValid, createComment);
