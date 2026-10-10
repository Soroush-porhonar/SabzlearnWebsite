import { Router } from "express";
import {
  coverUpload,
  createCourse,
  deleteCourse,
  getAllCourse,
  updateCourse,
} from "../../controllers/v1/course.js";
import { isToken } from "../../middleware/auth.js";
import { isAdmin } from "../../middleware/adminVerification.js";
import {
  createSession,
  getAllSession,
  getSessionInfo,
  removeSession,
  videoUpload,
} from "../../controllers/v1/session.js";
import { isIdValid } from "../../middleware/idValidation.js";
export const courseRouter = Router();

courseRouter.route("/").post(isToken, isAdmin, coverUpload, createCourse);
courseRouter.route("/").put(updateCourse);
courseRouter.route("/").delete(deleteCourse);
courseRouter.route("/").get(getAllCourse);
//////////////////////////////////////////////////////////////////
courseRouter
  .route("/session/:id") //courseId
  .post(isToken, isAdmin, isIdValid, videoUpload, createSession);
courseRouter.route("./session").get(isToken, isAdmin, getAllSession);
courseRouter.route("./session/:id").get(isIdValid, getSessionInfo); //sessionId
courseRouter
  .route("./session/:Id") //sessionId
  .delete(isToken, isAdmin, isIdValid, removeSession);
