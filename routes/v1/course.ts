import { Router } from "express";
import {
  coverUpload,
  createCourse,
  deleteCourse,
  getAllCourse,
  getCatCourse,
  getCourseInfo,
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
import { createEnrollment } from "../../controllers/v1/enrollment.js";

export const courseRouter = Router();

courseRouter.route("/").post(isToken, isAdmin, coverUpload, createCourse);
courseRouter.route("/").put(updateCourse);
courseRouter.route("/").delete(deleteCourse);
courseRouter.route("/").get(getAllCourse);
courseRouter.route("/:href/category").get(getCatCourse);
courseRouter.route("/:courseId").get(isIdValid, getCourseInfo);
//////////////////////////////////////////////////////////////////
courseRouter
  .route("/session/:courseId") //courseId
  .post(isToken, isAdmin, isIdValid, videoUpload, createSession);
courseRouter.route("./session").get(isToken, isAdmin, getAllSession);
courseRouter.route("./session/:sessionId").get(isIdValid, getSessionInfo); //sessionId
courseRouter
  .route("./session/:sessionId") //sessionId
  .delete(isToken, isAdmin, isIdValid, removeSession);
//////////////////////////////////////////////////////
courseRouter
  .route("./enroll/:courseId") //courseId
  .delete(isToken, isIdValid, createEnrollment);
