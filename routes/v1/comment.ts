import { Router } from "express";
import {
  acceptComment,
  createComment,
  getAllComment,
  rejectComment,
  removeComment,
  replyComment,
} from "../../controllers/v1/comments.js";
import { isIdValid } from "../../middleware/idValidation.js";
import { isToken } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/adminVerification.js";

export const commentRouter = Router();

commentRouter.route("/:courseId/post").post(isToken, isIdValid, createComment);
commentRouter
  .route("/:commentId/delete")
  .delete(isToken, isAdmin, isIdValid, removeComment);
commentRouter
  .route("/:commentId/accept")
  .put(isToken, isAdmin, isIdValid, acceptComment);
commentRouter
  .route("/:commentId/reject")
  .put(isToken, isAdmin, isIdValid, rejectComment);
commentRouter
  .route("/:commentId/reply")
  .post(isToken, isAdmin, isIdValid, replyComment);
commentRouter.route("/").get(isToken, isAdmin, getAllComment);
